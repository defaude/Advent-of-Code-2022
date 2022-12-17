import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { calcMostReleasedPressure } from './proboscideaVolcanium';

describe('16', async () => {
    const example = await getFileLines('16-example.txt', import.meta.url);

    describe('calcMostReleasedPressure', () => {
        it('should figure out the maximum pressure that can be released in 30 minutes', () => {
            expect(calcMostReleasedPressure(example)).toBe(1651);
        });
    });
});
