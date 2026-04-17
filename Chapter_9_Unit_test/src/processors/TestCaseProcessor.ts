import { ITestCaseProcessor } from "../interfaces/ITestCaseProcessor";
import { IPairFinder } from "../interfaces/IPairFinder";

export class TestCaseProcessor implements ITestCaseProcessor {
  constructor(private readonly pairFinder: IPairFinder) {}

  processAll(testCases: number[]): number[] {
    return testCases.map((upperBound) =>
      this.pairFinder.findEqualDivisorPairsCount(upperBound)
    );
  }
}
