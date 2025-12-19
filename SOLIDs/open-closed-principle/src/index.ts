import { Order } from './models/Order';
import { DiscountCalculator } from './services/DiscountCalculator';
import { NewCustomerDiscountStrategy } from './services/NewCustomerDiscount';
import { HolidaySeasonDiscountStrategy } from './services/HolidaySeasonDiscount';

const normalOrder = new Order(1, 'Riya', 500, false, false);
const newCustomerHolidayOrder = new Order(2, 'New User', 1000, true, true);

const discountCalculator = new DiscountCalculator([
  new NewCustomerDiscountStrategy(0.1),
  new HolidaySeasonDiscountStrategy(100)
]);

function printOrderSummary(order: Order) {
  const totalDiscount = discountCalculator.calculateTotalDiscount(order);
  const finalPrice = discountCalculator.calculateFinalPrice(order);

  console.log(`Order ID: ${order.id}`);
  console.log(`Customer: ${order.customerName}`);
  console.log(`Original total: ${order.totalAmount}`);
  console.log(`Total discount: ${totalDiscount}`);
  console.log(`Final price: ${finalPrice}`);
}

printOrderSummary(normalOrder);
printOrderSummary(newCustomerHolidayOrder);
