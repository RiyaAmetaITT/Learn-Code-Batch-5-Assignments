import { Order } from '../models/Order';
import { DiscountStrategy } from './DiscountStrategy';

export class NewCustomerDiscountStrategy implements DiscountStrategy {
  constructor(private readonly percentage: number = 0.1) {}

  getDiscount(order: Order): number {
    if (!order.isNewCustomer) return 0;
    return order.totalAmount * this.percentage;
  }
}
