declare const require: (module: string) => any;
declare const process: {
    stdin: any;
    stdout: any;
};

const readline = require('readline');

interface ArraySizeAndQueryCount {
    arraySize: number;
    queryCount: number;
}

interface QueryIndices {
    leftIndex: number;
    rightIndex: number;
}

function parseInputDimensions(inputLine: string): ArraySizeAndQueryCount {
    const [arraySize, queryCount] = inputLine.split(' ').map(Number);
    return { arraySize, queryCount };
}

function readArrayElements(inputLine: string, arraySize: number): number[] {
    return inputLine.split(' ').map(Number).slice(0, arraySize);
}

function buildPrefixSumArray(arrayElements: number[]): number[] {
    const prefixSumArray: number[] = [0];
    
    for (let i = 0; i < arrayElements.length; i++) {
        prefixSumArray[i + 1] = prefixSumArray[i] + arrayElements[i];
    }
    
    return prefixSumArray;
}

function readQueryIndices(inputLine: string): QueryIndices {
    const [leftIndex, rightIndex] = inputLine.split(' ').map(Number);
    return { leftIndex, rightIndex };
}

function calculateFloorOfMean(prefixSumArray: number[], queryIndices: QueryIndices): number {
    const { leftIndex, rightIndex } = queryIndices;
    const subarraySum = prefixSumArray[rightIndex] - prefixSumArray[leftIndex - 1];
    const subarrayLength = rightIndex - leftIndex + 1;
    
    return Math.floor(subarraySum / subarrayLength);
}

function processQueries(
    prefixSumArray: number[],
    queryCount: number,
    readLine: () => Promise<string>
): Promise<void> {
    return new Promise(async (resolve) => {
        for (let i = 0; i < queryCount; i++) {
            const queryLine = await readLine();
            const queryIndices = readQueryIndices(queryLine);
            const result = calculateFloorOfMean(prefixSumArray, queryIndices);
            console.log(result);
        }
        resolve();
    });
}

async function main(): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const readLine = (): Promise<string> => {
        return new Promise((resolve) => {
            rl.once('line', resolve);
        });
    };

    const firstLine = await readLine();
    const { arraySize, queryCount } = parseInputDimensions(firstLine);

    const arrayLine = await readLine();
    const arrayElements = readArrayElements(arrayLine, arraySize);

    const prefixSumArray = buildPrefixSumArray(arrayElements);

    await processQueries(prefixSumArray, queryCount, readLine);

    rl.close();
}

main();

