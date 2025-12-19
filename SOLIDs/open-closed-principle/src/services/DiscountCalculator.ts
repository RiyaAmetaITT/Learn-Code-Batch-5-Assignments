import { Order } from '../models/Order';
import { DiscountStrategy } from './DiscountStrategy';

export class DiscountCalculator {
  constructor(private readonly strategies: DiscountStrategy[]) {}

  calculateTotalDiscount(order: Order): number {
    return this.strategies
      .map((strategy) => strategy.getDiscount(order))
      .reduce((sum, discount) => sum + discount, 0);
  }

  calculateFinalPrice(order: Order): number {
    const discount = this.calculateTotalDiscount(order);
    return order.totalAmount - discount;
  }
}
