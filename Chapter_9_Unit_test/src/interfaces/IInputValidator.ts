export interface IInputValidator<TValue> {
  validate(value: TValue): void;
}
