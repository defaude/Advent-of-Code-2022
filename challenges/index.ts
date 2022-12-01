import { getFileLines } from './getFileLines';
import { maxCalories, topThreeCalories } from './01/calorieCount';

const input01 = await getFileLines('01/input.txt', import.meta.url);

console.info('[CHALLENGE 01-1]', maxCalories(input01));
console.info('[CHALLENGE 01-2]', topThreeCalories(input01));
