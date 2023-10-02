import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { isPairInRightOrder, multiplySeparatorPacketIndices, sumCorrectlyOrderedPairsIndices } from './distressSignal';

describe('13', async () => {
    const example = await getFileLines('13-example.txt', import.meta.url);

    describe('isPairInRightOrder', () => {
        it('should compare [1,1,3,1,1] vs [1,1,5,1,1]', () => {
            const left = [1, 1, 3, 1, 1];
            const right = [1, 1, 5, 1, 1];
            expect(isPairInRightOrder([left, right])).toBe(true);
        });

        it('should compare [[1],[2,3,4]] vs [[1],4]', () => {
            const left = [[1], [2, 3, 4]];
            const right = [[1], 4];
            expect(isPairInRightOrder([left, right])).toBe(true);
        });

        it('should compare [9] vs [[8,7,6]]', () => {
            const left = [9];
            const right = [[8, 7, 6]];
            expect(isPairInRightOrder([left, right])).toBe(false);
        });

        it('should compare [[4,4],4,4] vs [[4,4],4,4,4]', () => {
            const left = [[4, 4], 4, 4];
            const right = [[4, 4], 4, 4, 4];
            expect(isPairInRightOrder([left, right])).toBe(true);
        });

        it('should compare [1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9]', () => {
            const left = [1, [2, [3, [4, [5, 6, 7]]]], 8, 9];
            const right = [1, [2, [3, [4, [5, 6, 0]]]], 8, 9];
            expect(isPairInRightOrder([left, right])).toBe(false);
        });
    });

    describe('sumCorrectlyOrderedPairsIndices', () => {
        it('should calculate the sum of indices of the pairs are in the right order', () => {
            expect(sumCorrectlyOrderedPairsIndices(example)).toBe(13);
        });
    });

    describe('multiplySeparatorPacketIndices', () => {
        it('should multiply the indices of the separator packets after sorting all the packets', () => {
            expect(multiplySeparatorPacketIndices(example)).toBe(140);
        });
    });
});
