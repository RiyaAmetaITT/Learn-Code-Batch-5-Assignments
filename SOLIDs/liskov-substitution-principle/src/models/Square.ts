import { Shape } from './Shape';

export class Square implements Shape {
  constructor(private size: number) {}

  setSize(size: number): void {
    this.size = size;
  }

  getArea(): number {
    return this.size * this.size;
  }
}
