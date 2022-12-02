import { getFileLines } from './utility/getFileLines';
import { maxCalories, topThreeCalories } from './challenges/01/calorieCount';
import { rockPaperScissors } from './challenges/02/rockPaperScissors';

const input = async (file: string) =>
    getFileLines(`challenges/${file}`, import.meta.url);

const input01 = await input('01/01-input.txt');
const input02 = await input('02/02-input.txt');

console.info('[CHALLENGE 01-1]', maxCalories(input01));
console.info('[CHALLENGE 01-2]', topThreeCalories(input01));

console.info('[CHALLENGE 02-1]', rockPaperScissors(input02));
