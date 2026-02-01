public class Paperboy {
    public void collectPayment(Customer customer, double paymentAmount) {
        if (customer.makePayment((float) paymentAmount)) {
            // Payment successful
        } else {
            // come back later
        }
    }
}
