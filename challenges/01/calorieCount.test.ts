import { describe, expect, it } from 'vitest';
import { maxCalories, topThreeCalories } from './calorieCount';
import { getFileLines } from '../getFileLines';

describe('01', async () => {
    const example = await getFileLines('exampleInput.txt', import.meta.url);
    const data = await getFileLines('input.txt', import.meta.url);

    describe('maxCalories', () => {
        it('should create the expected result for example data', async () => {
            expect(maxCalories(example)).toBe(24000);
        });

        it('should produce the solution', async () => {
            const result = maxCalories(data);
            console.info('01-1 maxCalories', result);
        });
    });

    describe('topThreeCalories', () => {
        it('should create the expected result for example data', () => {
            expect(topThreeCalories(example)).toBe(45000);
        });

        it('should produce the solution', async () => {
            const result = topThreeCalories(data);
            console.info('01-2 topThreeCalories', result);
        });
    });
});
