import { describe, expect, it } from 'vitest';
import { maxCalories } from './calorieCount';
import { getFileLines } from '../getFileLines';

describe('calorieCount', () => {
    it('should solve the example data', async () => {
        const lines = await getFileLines('exampleInput.txt', import.meta.url);
        expect(maxCalories(lines)).toBe(24000);
    });

    it('should produce the solution', async () => {
        const lines = await getFileLines('input.txt', import.meta.url);
        const result = maxCalories(lines);
        console.info('01 calorieCount', result);
    });
});
