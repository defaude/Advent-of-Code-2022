import { getFileLines } from './utility/getFileLines';
import { maxCalories, topThreeCalories } from './challenges/01/calorieCount';
import {
    dynamicRockPaperScissors,
    staticRockPaperScissors,
} from './challenges/02/rockPaperScissors';
import {
    sumRucksackDuplicates,
    sumRucksackGroups,
} from './challenges/03/rucksack';
import {
    sortCrates9001,
    sortCratesHanoiStyle,
} from './challenges/05/supplyStacks';

const input = async (file: string) =>
    getFileLines(`challenges/${file}`, import.meta.url);

const input01 = await input('01/01-input.txt');
const input02 = await input('02/02-input.txt');
const input03 = await input('03/03-input.txt');
const input05 = await input('05/05-input.txt');

console.info('[CHALLENGE 01-1]', maxCalories(input01));
console.info('[CHALLENGE 01-2]', topThreeCalories(input01));

console.info('[CHALLENGE 02-1]', staticRockPaperScissors(input02));
console.info('[CHALLENGE 02-2]', dynamicRockPaperScissors(input02));

console.info('[CHALLENGE 03-1]', sumRucksackDuplicates(input03));
console.info('[CHALLENGE 03-2]', sumRucksackGroups(input03));

console.info('[CHALLENGE 05-1]', sortCratesHanoiStyle(input05));
console.info('[CHALLENGE 05-2]', sortCrates9001(input05));
