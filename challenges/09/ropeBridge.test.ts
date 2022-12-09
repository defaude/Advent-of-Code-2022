import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { getMaxScenicScore } from '../08/treeHouse';
import { countTailPositions } from './ropeBridge';

describe('08', async () => {
    const example = await getFileLines('09-example.txt', import.meta.url);

    describe('countTailPositions', () => {
        it('should return the number of positions that the rope tail occupied', () => {
            expect(countTailPositions(example)).toBe(13);
        });
    });

    describe('getMaxScenicScore', () => {
        it.skip('should calculate the amount of trees that are visible from the outside', () => {
            // expect(getMaxScenicScore(example)).toBe(8);
        });
    });
});
