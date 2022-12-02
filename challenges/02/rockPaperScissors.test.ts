import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { rockPaperScissors } from './rockPaperScissors';

describe('02', async () => {
    const example = await getFileLines('02-example.txt', import.meta.url);

    it('should return the score', function () {
        expect(rockPaperScissors(example)).toBe(15);
    });
});
