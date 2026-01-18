declare function print(message: string): void;

const TAX_RATE = 0.18;
const DISCOUNT_RATE = 0.1;

function placeOrder(orderId, orderAmount) {
  if (isOrderInvalid(orderId, orderAmount)) {
    showInvalidOrderMessage();
    return;
  }

  const finalAmount = calculateFinalAmount(orderAmount);

  saveOrder(orderId, finalAmount);
  print("Order placed successfully");
}

function isOrderInvalid(orderId, orderAmount) {
  return orderId <= 0 || orderAmount <= 0;
}

function calculateFinalAmount(orderAmount) {
  const discountAmount = calculateDiscount(orderAmount);
  const tax = calculateTax(orderAmount);

  return orderAmount + tax - discountAmount;
}

function calculateDiscount(amount) {
  return amount * DISCOUNT_RATE;
}

function calculateTax(amount) {
  return amount * TAX_RATE;
}

function showInvalidOrderMessage() {
  print("Order cannot be empty");
}

function saveOrder(orderId, amount) {
  print("Order saved in database");
}