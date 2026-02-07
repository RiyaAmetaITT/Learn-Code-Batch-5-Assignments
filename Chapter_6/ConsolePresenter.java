public class ConsolePresenter implements BalancePresenter {
    public void displayHeader(String message) {
        System.out.println(message);
    }

    @Override
    public void showBalance(String customerName, float balance) {
        System.out.println(customerName + " has $" + balance);
    }

    public void displayCustomerBalance(Customer customer) {
        System.out.println(customer.getBalanceInfo());
    }

    public void displaySection(String title) {
        System.out.println();
        System.out.println(title);
    }

    public void displayPaymentCollection(float amount) {
        System.out.println("Collecting payments of $" + amount + " from each customer:\n");
    }

    public void displayPaymentResult(PaymentResult result) {
        if (result.isSuccess()) {
            System.out.println(result.getCollectorName() + " collected $" + result.getAmount()
                    + " from " + result.getCustomerName());
        } else {
            System.out.println("Payment failed: Insufficient funds for " + result.getCustomerName());
        }
    }

    public void displayNewLine() {
        System.out.println();
    }
}
