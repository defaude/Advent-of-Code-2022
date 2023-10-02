import { getFileLines } from './getFileLines';

export const getNonBlankFileLines = async (file: string, metaUrl: string) => {
    return (await getFileLines(file, metaUrl)).filter((line) => line.trim().length > 0);
};
