public class Main {
    public static void main(String[] args) {
        Customer customer1 = new Customer("John Doe", 100.0f);
        Customer customer2 = new Customer("Jane Smith", 50.0f);
        Customer customer3 = new Customer("Bob Johnson", 20.0f);

        Paperboy paperboy = new Paperboy("Tim");

        System.out.println("=== Paperboy Payment Collection System ===\n");

        System.out.println("Initial Balances:");
        displayCustomerBalance(customer1);
        displayCustomerBalance(customer2);
        displayCustomerBalance(customer3);
        System.out.println();

        float newspaperCost = 30.0f;
        System.out.println("Collecting payments of $" + newspaperCost + " from each customer:\n");

        paperboy.collectPayment(customer1, newspaperCost);
        paperboy.collectPayment(customer2, newspaperCost);
        paperboy.collectPayment(customer3, newspaperCost);

        System.out.println();
        System.out.println("Final Balances:");
        displayCustomerBalance(customer1);
        displayCustomerBalance(customer2);
        displayCustomerBalance(customer3);
    }

    private static void displayCustomerBalance(Customer customer) {
        System.out.println(customer.getName() + ": $" + customer.getBalance());
    }
}
