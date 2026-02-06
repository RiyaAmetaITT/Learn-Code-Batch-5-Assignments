public class PaymentValidator {
    public boolean isValidPaymentAmount(float amount) {
        return amount > 0;
    }

    public boolean canProcessPayment(float amount, float customerBalance) {
        if (!isValidPaymentAmount(amount)) {
            return false;
        }
        return customerBalance >= amount;
    }
}
