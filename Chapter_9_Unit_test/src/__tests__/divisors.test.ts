import { PositiveIntegerValidator } from "../validators/PositiveIntegerValidator";
import { PositiveDivisorCounter } from "../counters/PositiveDivisorCounter";

describe("PositiveIntegerValidator", () => {
  let positiveIntegerValidator: PositiveIntegerValidator;

  beforeEach(() => {
    positiveIntegerValidator = new PositiveIntegerValidator();
  });

  describe("validate — positive cases (should not throw)", () => {
    test("n = 1  →  smallest valid positive integer — no error", () => {
      expect(() => positiveIntegerValidator.validate(1)).not.toThrow();
    });

    test("n = 2  →  smallest prime — no error", () => {
      expect(() => positiveIntegerValidator.validate(2)).not.toThrow();
    });

    test("n = 14  →  typical composite — no error", () => {
      expect(() => positiveIntegerValidator.validate(14)).not.toThrow();
    });

    test("n = 1000  →  large positive integer — no error", () => {
      expect(() => positiveIntegerValidator.validate(1000)).not.toThrow();
    });
  });

  describe("validate — negative cases (should throw RangeError)", () => {
    test("n = 0  →  zero is not a positive integer", () => {
      expect(() => positiveIntegerValidator.validate(0)).toThrow(RangeError);
    });

    test("n = -1  →  negative integer is invalid", () => {
      expect(() => positiveIntegerValidator.validate(-1)).toThrow(RangeError);
    });

    test("n = -100  →  large negative integer is invalid", () => {
      expect(() => positiveIntegerValidator.validate(-100)).toThrow(RangeError);
    });

    test("n = 1.5  →  non-integer decimal is invalid", () => {
      expect(() => positiveIntegerValidator.validate(1.5)).toThrow(RangeError);
    });

    test("n = NaN  →  NaN is not a valid integer", () => {
      expect(() => positiveIntegerValidator.validate(NaN)).toThrow(RangeError);
    });

    test("n = Infinity  →  Infinity is not a finite integer", () => {
      expect(() => positiveIntegerValidator.validate(Infinity)).toThrow(RangeError);
    });
  });
});

describe("PositiveDivisorCounter", () => {
  let divisorCounter: PositiveDivisorCounter;

  beforeEach(() => {
    divisorCounter = new PositiveDivisorCounter(new PositiveIntegerValidator());
  });

  describe("count — positive cases (correct divisor counts)", () => {
    test("n = 1  →  only divisor is 1  →  count = 1", () => {
      expect(divisorCounter.count(1)).toBe(1);
    });

    test("n = 2  →  divisors: 1, 2  →  count = 2 (prime)", () => {
      expect(divisorCounter.count(2)).toBe(2);
    });

    test("n = 3  →  divisors: 1, 3  →  count = 2 (prime)", () => {
      expect(divisorCounter.count(3)).toBe(2);
    });

    test("n = 4  →  divisors: 1, 2, 4  →  count = 3 (perfect square)", () => {
      expect(divisorCounter.count(4)).toBe(3);
    });

    test("n = 6  →  divisors: 1, 2, 3, 6  →  count = 4", () => {
      expect(divisorCounter.count(6)).toBe(4);
    });

    test("n = 14  →  divisors: 1, 2, 7, 14  →  count = 4 (problem example)", () => {
      expect(divisorCounter.count(14)).toBe(4);
    });

    test("n = 15  →  divisors: 1, 3, 5, 15  →  count = 4 (problem example)", () => {
      expect(divisorCounter.count(15)).toBe(4);
    });

    test("n = 12  →  divisors: 1, 2, 3, 4, 6, 12  →  count = 6", () => {
      expect(divisorCounter.count(12)).toBe(6);
    });

    test("n = 36  →  perfect square; divisors: 1,2,3,4,6,9,12,18,36  →  count = 9", () => {
      expect(divisorCounter.count(36)).toBe(9);
    });

    test("n = 100  →  divisors include 1,2,4,5,10,20,25,50,100  →  count = 9", () => {
      expect(divisorCounter.count(100)).toBe(9);
    });

    test("all prime numbers have exactly 2 divisors", () => {
      const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      primeNumbers.forEach((prime) => {
        expect(divisorCounter.count(prime)).toBe(2);
      });
    });

    test("perfect squares have an odd divisor count", () => {
      const perfectSquares = [1, 4, 9, 16, 25, 36, 49];
      perfectSquares.forEach((square) => {
        expect(divisorCounter.count(square) % 2).toBe(1);
      });
    });
  });

  describe("count — negative cases (invalid input delegates to validator)", () => {
    test("n = 0  →  throws RangeError", () => {
      expect(() => divisorCounter.count(0)).toThrow(RangeError);
    });

    test("n = -5  →  throws RangeError", () => {
      expect(() => divisorCounter.count(-5)).toThrow(RangeError);
    });

    test("n = 2.5  →  non-integer throws RangeError", () => {
      expect(() => divisorCounter.count(2.5)).toThrow(RangeError);
    });

    test("n = NaN  →  throws RangeError", () => {
      expect(() => divisorCounter.count(NaN)).toThrow(RangeError);
    });
  });
});
