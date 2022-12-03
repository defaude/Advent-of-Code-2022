import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import {
    findRucksackGroupBadge,
    getRucksackDuplicate,
    getRucksackItemPriority,
    isUpperCase,
    splitLine,
    sumRucksackDuplicates,
    sumRucksackGroups,
} from './rucksack';

describe('03', async () => {
    const example = await getFileLines('03-example.txt', import.meta.url);

    describe('isUpperCase', () => {
        it('should return whether the input is an uppercase letter', () => {
            expect(isUpperCase('A')).toBe(true);
            expect(isUpperCase('x')).toBe(false);
        });

        it('should throw for empty strings', () => {
            expect(() => isUpperCase('')).toThrow();
        });

        it('should throw for strings with more than 1 char', () => {
            expect(() => isUpperCase('abcd')).toThrow();
        });
    });

    describe('getRucksackItemPriority', () => {
        it('should return the correct priorities for letters', () => {
            expect(getRucksackItemPriority('a')).toBe(1);
            expect(getRucksackItemPriority('z')).toBe(26);
            expect(getRucksackItemPriority('A')).toBe(27);
            expect(getRucksackItemPriority('Z')).toBe(52);
        });
    });

    describe('splitLine', () => {
        it('should throw for uneven or empty lines', () => {
            expect(() => splitLine('')).toThrow();
            expect(() => splitLine('a')).toThrow();
            expect(() => splitLine('abc')).toThrow();
        });

        it('should return both halves of the given line', () => {
            expect(splitLine('abcdef')).toEqual(['abc', 'def']);
        });
    });

    describe('getRucksackDuplicate', () => {
        it('should throw for lines without duplicates', function () {
            expect(() => getRucksackDuplicate('abcdef')).toThrow();
        });

        it('should return the duplicated character', function () {
            expect(getRucksackDuplicate('abcdea')).toBe('a');
        });
    });

    describe('sumRucksackDuplicates', () => {
        it('should sum the priorities of the items that are duplicates inside of their rucksack', () => {
            expect(sumRucksackDuplicates(example)).toBe(157);
        });
    });

    describe('findRucksackGroupBadge', () => {
        it('should return the item that is present in all lines of the group', function () {
            expect(findRucksackGroupBadge(['abc', 'ade', 'afg'])).toBe('a');
        });
    });

    describe('sumRucksackGroups', () => {
        it('should find the item for each group of 3 and then sum up all those letters', () => {
            expect(sumRucksackGroups(example)).toBe(70);
        });
    });
});
