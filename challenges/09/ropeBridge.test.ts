import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { countMultiKnotTailPositions, countTailPositions } from './ropeBridge';

describe('09', async () => {
    const example = await getFileLines('09-example.txt', import.meta.url);
    const example2 = await getFileLines('09-example2.txt', import.meta.url);

    describe('countTailPositions', () => {
        it('should return the number of positions that the rope tail occupied', () => {
            expect(countTailPositions(example)).toBe(13);
        });
    });

    describe('countMultiKnotTailPositions', () => {
        it("should return the number of positions that the rope's last knot occupied", () => {
            expect(countMultiKnotTailPositions(example)).toBe(1);
            expect(countMultiKnotTailPositions(example2)).toBe(36);
        });
    });
});
