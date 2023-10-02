import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { getMonkeyBusinessLevel } from './monkeyInTheMiddle';

describe('11', async () => {
    const example = await getFileLines('11-example.txt', import.meta.url);

    describe('getMonkeyBusinessLevel', () => {
        it('should calculate the correct monkey business level with Relief', () => {
            expect(getMonkeyBusinessLevel(example, 20)).toBe(10605);
        });

        it('should calculate the correct monkey business level without Relief', () => {
            expect(getMonkeyBusinessLevel(example, 10000, false)).toBe(2713310158);
        });
    });
});
