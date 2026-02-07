public class Main {
    public static void main(String[] args) {
        ConsolePresenter presenter = new ConsolePresenter();
        
        Customer customer1 = new Customer("John Doe", new Wallet(100.0f));
        Customer customer2 = new Customer("Jane Smith", new Wallet(50.0f));
        Customer customer3 = new Customer("Bob Johnson", new Wallet(20.0f));

        Paperboy paperboy = new Paperboy("Tim");

        presenter.displayHeader("=== Paperboy Payment Collection System ===\n");

        presenter.displaySection("Initial Balances:");
        displayAllCustomerBalances(presenter, customer1, customer2, customer3);
        presenter.displayNewLine();

        float newspaperCost = 30.0f;
        presenter.displayPaymentCollection(newspaperCost);

        PaymentResult result1 = paperboy.collectPayment(customer1, newspaperCost);
        presenter.displayPaymentResult(result1);
        
        PaymentResult result2 = paperboy.collectPayment(customer2, newspaperCost);
        presenter.displayPaymentResult(result2);
        
        PaymentResult result3 = paperboy.collectPayment(customer3, newspaperCost);
        presenter.displayPaymentResult(result3);

        presenter.displaySection("Final Balances:");
        displayAllCustomerBalances(presenter, customer1, customer2, customer3);
    }

    private static void displayAllCustomerBalances(ConsolePresenter presenter, Customer... customers) {
        for (Customer customer : customers) {
            presenter.displayCustomerBalance(customer);
        }
    }
}
