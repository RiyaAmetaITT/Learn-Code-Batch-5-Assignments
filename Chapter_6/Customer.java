public class Customer {
    private String name;
    private Wallet wallet;
    private WalletService walletService;

    public Customer(String name, float initialBalance) {
        this.name = name;
        this.wallet = new Wallet(initialBalance);
        this.walletService = new WalletService();
    }

    public Customer(String name, Wallet wallet, WalletService walletService) {
        this.name = name;
        this.wallet = wallet;
        this.walletService = walletService;
    }

    public String getName() {
        return name;
    }

    public boolean makePayment(float amount) {
        return walletService.deduct(wallet, amount);
    }

    public float getBalance() {
        return wallet.getBalance();
    }

    public boolean addFunds(float amount) {
        return walletService.addFunds(wallet, amount);
    }
}
