public class Wallet {
    private float balance;

    public Wallet(float initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.balance = initialBalance;
    }

    public boolean deduct(float amount) {
        if (!isValidAmount(amount)) {
            return false;
        }

        if (!hasSufficientFunds(amount)) {
            return false;
        }

        this.balance -= amount;
        return true;
    }

    public boolean addFunds(float amount) {
        if (!isValidAmount(amount)) {
            return false;
        }

        this.balance += amount;
        return true;
    }

    private boolean isValidAmount(float amount) {
        return amount > 0;
    }

    private boolean hasSufficientFunds(float amount) {
        return this.balance >= amount;
    }

    float getBalance() {
        return balance;
    }
}
