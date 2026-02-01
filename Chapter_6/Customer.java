public class Customer {
    private String firstName;
    private String lastName;
    private Wallet wallet;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean makePayment(float amount) {
        if (wallet != null && wallet.hasSufficientFunds(amount)) {
            wallet.deduct(amount);
            return true;
        }
        return false;
    }
}
