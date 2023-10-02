import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { countEnclosedPairs, countOverlappingPairs } from './campCleanup';

describe('05', async () => {
    const example = await getFileLines('04-example.txt', import.meta.url);

    describe('countEnclosedPairs', () => {
        it('should return the amount of groups where one is fully enclosed in the other one', () => {
            expect(countEnclosedPairs(example)).toBe(2);
        });
    });

    describe('countOverlappingPairs', () => {
        it('should return the amount of groups that overlap', () => {
            expect(countOverlappingPairs(example)).toBe(4);
        });
    });
});
