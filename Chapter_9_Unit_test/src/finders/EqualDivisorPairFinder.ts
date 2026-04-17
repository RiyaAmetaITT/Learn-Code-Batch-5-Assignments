import { IPairFinder } from "../interfaces/IPairFinder";
import { IDivisorCounter } from "../interfaces/IDivisorCounter";
import { IInputValidator } from "../interfaces/IInputValidator";

export class EqualDivisorPairFinder implements IPairFinder {
  constructor(
    private readonly divisorCounter: IDivisorCounter,
    private readonly upperBoundValidator: IInputValidator<number>
  ) {}

  findEqualDivisorPairsCount(upperBound: number): number {
    this.upperBoundValidator.validate(upperBound);

    let equalPairCount = 0;

    for (let n = 2; n < upperBound; n++) {
      const divisorsOfN = this.divisorCounter.count(n);
      const divisorsOfNextN = this.divisorCounter.count(n + 1);
      const hasEqualDivisorCount = divisorsOfN === divisorsOfNextN;

      if (hasEqualDivisorCount) {
        equalPairCount++;
      }
    }

    return equalPairCount;
  }
}
