import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { dynamicRockPaperScissors, staticRockPaperScissors } from './rockPaperScissors';

describe('02', async () => {
    const example = await getFileLines('02-example.txt', import.meta.url);

    describe('staticRockPaperScissors', () => {
        it('should return the score outcome for "static" RPS play', function () {
            expect(staticRockPaperScissors(example)).toBe(15);
        });
    });

    describe('dynamicRockPaperScissors', () => {
        it('should return the score outcome for "dynamic" RPS play', () => {
            expect(dynamicRockPaperScissors(example)).toBe(12);
        });
    });
});
