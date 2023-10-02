import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { parseCrates, sortCrates9001, sortCratesHanoiStyle } from './supplyStacks';

describe('05', async () => {
    const example = await getFileLines('05-example.txt', import.meta.url);

    describe('parseCrateLine', () => {
        it('should parse a line with just a single crate', () => {
            expect(parseCrates('[A]')).toEqual(['A']);
        });

        it('should parse a line with multiple columns', () => {
            expect(parseCrates('[A]     [B]')).toEqual(['A', undefined, 'B']);
            expect(parseCrates('    [A] [B]')).toEqual([undefined, 'A', 'B']);
        });
    });

    describe('sortCratesHanoiStyle', () => {
        it('should return the correct top-of-stack crates in order', () => {
            expect(sortCratesHanoiStyle(example)).toBe('CMZ');
        });
    });

    describe('sortCrates9001', () => {
        it('should return the correct top-of-stack crates in order', () => {
            expect(sortCrates9001(example)).toBe('MCD');
        });
    });
});
