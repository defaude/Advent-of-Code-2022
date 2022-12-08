import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { countVisibleTrees, getMaxScenicScore } from './treeHouse';

describe('08', async () => {
    const example = await getFileLines('08-example.txt', import.meta.url);

    describe('countVisibleTrees', () => {
        it('should calculate the amount of trees that are visible from the outside', () => {
            expect(countVisibleTrees(example)).toBe(21);
        });
    });

    describe('getMaxScenicScore', () => {
        it('should calculate the amount of trees that are visible from the outside', () => {
            expect(getMaxScenicScore(example)).toBe(8);
        });
    });
});
