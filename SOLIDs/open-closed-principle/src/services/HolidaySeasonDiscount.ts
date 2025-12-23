import { Order } from '../models/Order';
import { DiscountStrategy } from './DiscountStrategy';

export class HolidaySeasonDiscountStrategy implements DiscountStrategy {
  constructor(private readonly flatAmount: number = 50) {}

  getDiscount(order: Order): number {
    if (!order.isHolidaySeason) return 0;
    return Math.min(this.flatAmount, order.totalAmount);
  }
}
