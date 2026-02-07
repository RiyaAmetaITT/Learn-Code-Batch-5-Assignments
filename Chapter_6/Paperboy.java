public class Paperboy {
    private String name;

    public Paperboy(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public PaymentResult collectPayment(Customer customer, float amount) {
        if (customer == null) {
            return new PaymentResult(false, "Unknown", amount, name);
        }
        boolean success = customer.makePayment(amount);

        return new PaymentResult(success, customer.getName(), amount, name);
    }
}
