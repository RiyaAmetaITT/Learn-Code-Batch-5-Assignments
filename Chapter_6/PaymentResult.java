public class PaymentResult {
    private final boolean success;
    private final String customerName;
    private final float amount;
    private final String collectorName;

    public PaymentResult(boolean success, String customerName, float amount, String collectorName) {
        this.success = success;
        this.customerName = customerName;
        this.amount = amount;
        this.collectorName = collectorName;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getCustomerName() {
        return customerName;
    }

    public float getAmount() {
        return amount;
    }

    public String getCollectorName() {
        return collectorName;
    }
}
