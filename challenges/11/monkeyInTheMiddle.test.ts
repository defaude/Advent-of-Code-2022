import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { getMonkeyBusinessLevel } from './monkeyInTheMiddle';

describe('11', async () => {
    const example = await getFileLines('11-example.txt', import.meta.url);

    describe('getMonkeyBusinessLevel', () => {
        it('calculate the correct monkey business level with Relief', () => {
            expect(getMonkeyBusinessLevel(example, 20)).toBe(10605);
        });

        it('calculate the correct monkey business level without Relief', () => {
            expect(getMonkeyBusinessLevel(example, 10000, false)).toBe(2713310158);
        });
    });
});
