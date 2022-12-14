import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { countAllTheSands, countRestingSands } from './regolith';

describe('14', async () => {
    const example = await getFileLines('14-example.txt', import.meta.url);

    describe('countRestingSands', () => {
        it('should return how many units of sand come to rest', () => {
            expect(countRestingSands(example)).toBe(24);
        });
    });

    describe('countAllTheSands', () => {
        it('should return how many units of sand come to rest', () => {
            expect(countAllTheSands(example)).toBe(93);
        });
    });
});
