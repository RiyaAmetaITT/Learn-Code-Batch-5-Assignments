public class Wallet {
    private float balance;

    public float getBalance() {
        return balance;
    }

    public void setBalance(float newBalance) {
        this.balance = newBalance;
    }

    public boolean hasSufficientFunds(float amount) {
        return balance >= amount;
    }

    public void deduct(float amount) {
        balance -= amount;
    }
}
