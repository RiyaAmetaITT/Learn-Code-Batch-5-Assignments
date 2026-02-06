public class WalletService {
    private WalletValidator validator;

    public WalletService() {
        this.validator = new WalletValidator();
    }

    public WalletService(WalletValidator validator) {
        this.validator = validator;
    }

    public boolean deduct(Wallet wallet, float amount) {
        if (!validator.isValidAmount(amount)) {
            return false;
        }

        if (!validator.hasSufficientFunds(wallet, amount)) {
            return false;
        }

        wallet.setBalance(wallet.getBalance() - amount);
        return true;
    }

    public boolean addFunds(Wallet wallet, float amount) {
        if (!validator.isValidAmount(amount)) {
            return false;
        }

        wallet.setBalance(wallet.getBalance() + amount);
        return true;
    }
}
