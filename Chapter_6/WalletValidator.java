public class WalletValidator {

    public boolean hasSufficientFunds(Wallet wallet, float amount) {
        if (wallet == null) {
            return false;
        }
        if (amount < 0) {
            return false;
        }
        return wallet.getBalance() >= amount;
    }

    public boolean isValidAmount(float amount) {
        return amount >= 0;
    }
}
