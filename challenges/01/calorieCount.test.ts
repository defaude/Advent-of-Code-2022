import { describe, expect, it } from 'bun:test';
import { maxCalories, topThreeCalories } from './calorieCount';
import { getFileLines } from '../../utility/getFileLines';

describe('01', async () => {
    const example = await getFileLines('01-example.txt', import.meta.url);

    describe('maxCalories', () => {
        it('should return the calorie count of the elf carrying the most', async () => {
            expect(maxCalories(example)).toBe(24000);
        });
    });

    describe('topThreeCalories', () => {
        it('should return the top 3 calorie counts', () => {
            expect(topThreeCalories(example)).toBe(45000);
        });
    });
});
