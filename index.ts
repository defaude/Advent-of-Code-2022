import { getFileLines } from './utility/getFileLines';
import { maxCalories, topThreeCalories } from './challenges/01/calorieCount';

const input01 = await getFileLines(
    'challenges/01/01-input.txt',
    import.meta.url
);

console.info('[CHALLENGE 01-1]', maxCalories(input01));
console.info('[CHALLENGE 01-2]', topThreeCalories(input01));
