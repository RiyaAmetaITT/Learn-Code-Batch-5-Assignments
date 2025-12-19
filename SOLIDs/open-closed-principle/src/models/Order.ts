export class Order {
  constructor(
    public id: number,
    public customerName: string,
    public totalAmount: number,
    public isNewCustomer: boolean,
    public isHolidaySeason: boolean
  ) {}
}
