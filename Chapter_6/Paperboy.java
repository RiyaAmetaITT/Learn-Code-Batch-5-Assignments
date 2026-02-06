public class Paperboy {
    private String name;
    private PaymentValidator paymentValidator;

    public Paperboy(String name) {
        this.name = name;
        this.paymentValidator = new PaymentValidator();
    }

    public Paperboy(String name, PaymentValidator paymentValidator) {
        this.name = name;
        this.paymentValidator = paymentValidator;
    }

    public String getName() {
        return name;
    }

    public boolean collectPayment(Customer customer, float amount) {
        if (customer == null) {
            System.out.println("Error: Customer cannot be null");
            return false;
        }

        if (!paymentValidator.isValidPaymentAmount(amount)) {
            System.out.println("Error: Invalid payment amount");
            return false;
        }

        boolean paymentSuccessful = customer.makePayment(amount);

        if (paymentSuccessful) {
            System.out.println(name + " collected $" + amount + " from " + customer.getName());
        } else {
            System.out.println("Payment failed: Insufficient funds for " + customer.getName());
        }

        return paymentSuccessful;
    }
}
