import { UpperBoundValidator } from "../validators/UpperBoundValidator";
import { PositiveIntegerValidator } from "../validators/PositiveIntegerValidator";
import { PositiveDivisorCounter } from "../counters/PositiveDivisorCounter";
import { EqualDivisorPairFinder } from "../finders/EqualDivisorPairFinder";
import { TestCaseProcessor } from "../processors/TestCaseProcessor";

describe("UpperBoundValidator", () => {
  let upperBoundValidator: UpperBoundValidator;

  beforeEach(() => {
    upperBoundValidator = new UpperBoundValidator();
  });

  describe("validate — positive cases (should not throw)", () => {
    test("k = 2  →  minimum valid upper bound — no error", () => {
      expect(() => upperBoundValidator.validate(2)).not.toThrow();
    });

    test("k = 15  →  problem example value — no error", () => {
      expect(() => upperBoundValidator.validate(15)).not.toThrow();
    });

    test("k = 1000  →  large valid upper bound — no error", () => {
      expect(() => upperBoundValidator.validate(1000)).not.toThrow();
    });
  });

  describe("validate — negative cases (should throw RangeError)", () => {
    test("k = 1  →  below minimum — range 1 < n < 1 is empty", () => {
      expect(() => upperBoundValidator.validate(1)).toThrow(RangeError);
    });

    test("k = 0  →  zero is not a valid upper bound", () => {
      expect(() => upperBoundValidator.validate(0)).toThrow(RangeError);
    });

    test("k = -10  →  negative integer is invalid", () => {
      expect(() => upperBoundValidator.validate(-10)).toThrow(RangeError);
    });

    test("k = 2.7  →  non-integer decimal is invalid", () => {
      expect(() => upperBoundValidator.validate(2.7)).toThrow(RangeError);
    });

    test("k = NaN  →  NaN is not a valid bound", () => {
      expect(() => upperBoundValidator.validate(NaN)).toThrow(RangeError);
    });
  });
});

function buildEqualDivisorPairFinder(): EqualDivisorPairFinder {
  const positiveIntegerValidator = new PositiveIntegerValidator();
  const divisorCounter = new PositiveDivisorCounter(positiveIntegerValidator);
  const upperBoundValidator = new UpperBoundValidator();
  return new EqualDivisorPairFinder(divisorCounter, upperBoundValidator);
}

describe("EqualDivisorPairFinder", () => {
  let equalDivisorPairFinder: EqualDivisorPairFinder;

  beforeEach(() => {
    equalDivisorPairFinder = buildEqualDivisorPairFinder();
  });

  describe("findEqualDivisorPairsCount — positive cases (correct pair counts)", () => {
    test("k = 15 (problem example)  →  n=2 and n=14 qualify  →  count = 2", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(15)).toBe(2);
    });

    test("k = 2  →  empty range (no valid n)  →  count = 0", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(2)).toBe(0);
    });

    test("k = 3  →  only n=2 qualifies  →  count = 1", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(3)).toBe(1);
    });

    test("k = 4  →  only n=2 qualifies  →  count = 1", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(4)).toBe(1);
    });

    test("k = 10  →  only n=2 qualifies  →  count = 1", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(10)).toBe(1);
    });

    test("k = 20  →  n=2 and n=14 qualify  →  count = 2", () => {
      expect(equalDivisorPairFinder.findEqualDivisorPairsCount(20)).toBe(2);
    });

    test("k = 100  →  result is a non-negative integer", () => {
      const pairCount = equalDivisorPairFinder.findEqualDivisorPairsCount(100);
      expect(pairCount).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(pairCount)).toBe(true);
    });

    test("k = 1000  →  result is a non-negative integer", () => {
      const pairCount = equalDivisorPairFinder.findEqualDivisorPairsCount(1000);
      expect(pairCount).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(pairCount)).toBe(true);
    });
  });

  describe("findEqualDivisorPairsCount — negative cases (invalid upperBound)", () => {
    test("k = 1  →  throws RangeError", () => {
      expect(() =>
        equalDivisorPairFinder.findEqualDivisorPairsCount(1)
      ).toThrow(RangeError);
    });

    test("k = 0  →  throws RangeError", () => {
      expect(() =>
        equalDivisorPairFinder.findEqualDivisorPairsCount(0)
      ).toThrow(RangeError);
    });

    test("k = -5  →  throws RangeError", () => {
      expect(() =>
        equalDivisorPairFinder.findEqualDivisorPairsCount(-5)
      ).toThrow(RangeError);
    });

    test("k = 3.7  →  non-integer throws RangeError", () => {
      expect(() =>
        equalDivisorPairFinder.findEqualDivisorPairsCount(3.7)
      ).toThrow(RangeError);
    });

    test("k = NaN  →  throws RangeError", () => {
      expect(() =>
        equalDivisorPairFinder.findEqualDivisorPairsCount(NaN)
      ).toThrow(RangeError);
    });
  });
});

describe("TestCaseProcessor", () => {
  let testCaseProcessor: TestCaseProcessor;

  beforeEach(() => {
    testCaseProcessor = new TestCaseProcessor(buildEqualDivisorPairFinder());
  });

  describe("processAll — positive cases (correct batch results)", () => {
    test("single test case matching problem example: [15]  →  [2]", () => {
      expect(testCaseProcessor.processAll([15])).toEqual([2]);
    });

    test("multiple test cases return results in the same order", () => {
      expect(testCaseProcessor.processAll([2, 3, 15])).toEqual([0, 1, 2]);
    });

    test("empty input array  →  empty result array", () => {
      expect(testCaseProcessor.processAll([])).toEqual([]);
    });

    test("repeated same k value returns identical result each time", () => {
      expect(testCaseProcessor.processAll([15, 15, 15])).toEqual([2, 2, 2]);
    });

    test("result array length matches input array length", () => {
      const testCases = [2, 3, 4, 5, 10, 15];
      const results = testCaseProcessor.processAll(testCases);
      expect(results).toHaveLength(testCases.length);
    });
  });

  describe("processAll — negative cases (invalid test case propagates error)", () => {
    test("array containing invalid k = -1  →  throws RangeError", () => {
      expect(() => testCaseProcessor.processAll([15, -1, 3])).toThrow(RangeError);
    });

    test("array containing k = 0  →  throws RangeError", () => {
      expect(() => testCaseProcessor.processAll([0])).toThrow(RangeError);
    });

    test("array containing non-integer k = 2.5  →  throws RangeError", () => {
      expect(() => testCaseProcessor.processAll([2.5])).toThrow(RangeError);
    });
  });
});
