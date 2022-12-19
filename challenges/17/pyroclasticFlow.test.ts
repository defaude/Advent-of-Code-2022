import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { towerHeightAfter2022Rocks } from './pyroclasticFlow';

describe('17', async () => {
    const example = await getFileLines('17-example.txt', import.meta.url);

    describe('towerHeightAfter2022Rocks', () => {
        it('should calculate the tower height after 2022 rocks', () => {
            expect(towerHeightAfter2022Rocks(example)).toBe(3068);
        });
    });
});
