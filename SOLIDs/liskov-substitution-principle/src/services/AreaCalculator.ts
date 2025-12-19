import type { Shape } from '../models/Shape';

export class AreaCalculator {
  calculateArea(shape: Shape): number {
    return shape.getArea();
  }

  calculateTotal(shapes: Shape[]): number {
    return shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
  }
}
