import { createReadStream } from 'node:fs';
import { getFilePath } from './getFilePath';
import readline from 'node:readline';

const crlfDelay = Infinity;

export const getFileLines = async (
    file: string,
    metaUrl: string
): Promise<string[]> => {
    const result: string[] = [];

    const filePath = getFilePath(file, metaUrl);
    const input = createReadStream(filePath);
    const rl = readline.createInterface({ input, crlfDelay });

    for await (const line of rl) {
        result.push(line);
    }

    return result;
};
