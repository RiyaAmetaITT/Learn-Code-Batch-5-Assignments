package com.payment.processing;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

public class PaymentProcessor {
    private static final BigDecimal MIN_AMOUNT = new BigDecimal("0.01");
    private static final BigDecimal MAX_AMOUNT = new BigDecimal("5000");
    private static final int MAX_RETRIES = 2;
    private static final String PAYMENT_SUCCESS = "Payment successful";
    private static final String PAYMENT_FAILED = "Payment failed";
    
    private Logger logger;
    private NotificationService notifier;
    private Map<String, PaymentRecord> history;

    public PaymentProcessor(Logger logger, NotificationService notifier) {
        this.logger = logger;
        this.notifier = notifier;
        this.history = new HashMap<>();
    }

    public PaymentResult processPayment(PaymentRequest request) {
        validatePaymentRequest(request);
        int attempt = 0;
        while (attempt < MAX_RETRIES) {
            try {
                executePayment(request);
                recordPayment(request);
                notifyPaymentSuccess(request);
                return new PaymentResult(true, PAYMENT_SUCCESS, generateTransactionId());
            } catch (PaymentException e) {
                attempt++;
                logger.log("Retry attempt: " + attempt);
            }
        }
        return new PaymentResult(false, PAYMENT_FAILED, null);
    }

    private void validatePaymentRequest(PaymentRequest request) {
        if (request.customerId() == null 
        || request.customerId().isBlank()) {
            throw new IllegalArgumentException("Customer ID required");
        }
        if (request.amount() == null 
        || request.amount().compareTo(MIN_AMOUNT) < 0) {
            throw new IllegalArgumentException("Invalid amount");
        }
    }

    private void executePayment(PaymentRequest request) {
        logger.log("Executing payment of " + request.amount());
        if (request.amount().compareTo(MAX_AMOUNT) > 0) {
            throw new PaymentException("Limit exceeded");
        }
    }

    private void recordPayment(PaymentRequest request) {
        history.put(generateTransactionId(),
                new PaymentRecord(request.customerId(), request.amount(), LocalDateTime.now()));
    }

    private String generateTransactionId() {
        return "TXN-" + System.currentTimeMillis();
    }

    private void notifyPaymentSuccess(PaymentRequest request) {
        notifier.send(request.customerId(), "Payment of " + request.amount() + " processed");
    }
}