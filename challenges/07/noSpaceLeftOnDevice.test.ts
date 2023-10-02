import { describe, expect, it } from 'bun:test';
import { getDirectoryToDeleteSize, sumDirectoriesBelow100k } from './noSpaceLeftOnDevice';
import { getFileLines } from '../../utility/getFileLines';

describe('07', async () => {
    const example = await getFileLines('07-example.txt', import.meta.url);

    describe('sumDirectoriesBelow100k', () => {
        it('should sum the sizes of all directories smaller than 100k', () => {
            expect(sumDirectoriesBelow100k(example)).toBe(95437);
        });
    });

    describe('getDirectoryToDeleteSize', () => {
        it('should return the size of the smallest directory which would free up enough space', () => {
            expect(getDirectoryToDeleteSize(example)).toBe(24933642);
        });
    });
});
