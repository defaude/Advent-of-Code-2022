import { getFilePath } from './getFilePath';

export const getFileLines = async (file: string, metaUrl: string): Promise<string[]> => {
    const bunFile = Bun.file(getFilePath(file, metaUrl));
    const text = await bunFile.text();

    return text.split(/\r?\n/).slice(0, -1);
};
