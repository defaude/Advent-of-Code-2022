import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { getMinimumStepsToBestSignal, getShortestHike } from './hillClimbing';

describe('12', async () => {
    const example = await getFileLines('12-example.txt', import.meta.url);

    describe('getMinimumStepsToBestSignal', () => {
        it('should calculate the least amount of steps needed to reach the location with the best signal', () => {
            expect(getMinimumStepsToBestSignal(example)).toBe(31);
        });
    });

    describe('getShortestHike', () => {
        it('should calculate the shortest hike from a to the end', () => {
            expect(getShortestHike(example)).toBe(29);
        });
    });
});
