import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { getRegisterBuffer, paintPixelLetters, sumRegisterAtCycles } from './cathodeRayTube';

describe('10', async () => {
    const exampleOps = await getFileLines('10-ops-example.txt', import.meta.url);
    const example = await getFileLines('10-example.txt', import.meta.url);

    describe('getRegisterBuffer', () => {
        it('should return a buffer containing the register value after each cycle', () => {
            expect(getRegisterBuffer(exampleOps, 1)).toEqual([1, 1, 1, 4, 4, -1]);
        });
    });

    describe('sumRegisterAtCycles', () => {
        it('should sum up the register values at the given cycles', () => {
            expect(sumRegisterAtCycles(example, [20, 60, 100, 140, 180, 220], 1)).toBe(13140);
        });
    });

    describe('paintPixelLetters', () => {
        it('should paint pixels based on the register value', () => {
            const expectedOutput = `
##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;

            expect(paintPixelLetters(example)).toBe(expectedOutput);
        });
    });
});
