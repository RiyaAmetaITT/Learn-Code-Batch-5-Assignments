public class Customer {
    private String name;
    private Wallet wallet;

    public Customer(String name, Wallet wallet) {
        this.name = name;
        this.wallet = wallet;
    }

    public String getName() {
        return name;
    }

    public boolean makePayment(float amount) {
        return wallet.deduct(amount);
    }
    public boolean addFunds(float amount) {
        return wallet.addFunds(amount);
    }

    public String getBalanceInfo() {
        return name + " has $" + wallet.getBalance();
    }
}
