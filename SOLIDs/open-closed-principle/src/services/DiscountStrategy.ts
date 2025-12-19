import { Order } from '../models/Order';

export interface DiscountStrategy {
  getDiscount(order: Order): number;
}
