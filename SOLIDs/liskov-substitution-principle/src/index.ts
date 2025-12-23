import { Rectangle } from './models/Rectangle';
import { Square } from './models/Square';
import { AreaCalculator } from './services/AreaCalculator';
import type { Shape } from './models/Shape';

const areaCalculator = new AreaCalculator();

const shapes: Shape[] = [
  new Rectangle(5, 4),
  new Square(5),
];

for (const shape of shapes) {
    console.log('Area:', areaCalculator.calculateArea(shape));
}

console.log('Total area:', areaCalculator.calculateTotal(shapes));
