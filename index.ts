import { getFileLines } from './utility/getFileLines';
import { maxCalories, topThreeCalories } from './challenges/01/calorieCount';
import { dynamicRockPaperScissors, staticRockPaperScissors } from './challenges/02/rockPaperScissors';
import { sumRucksackDuplicates, sumRucksackGroups } from './challenges/03/rucksack';
import { sortCrates9001, sortCratesHanoiStyle } from './challenges/05/supplyStacks';
import { countEnclosedPairs, countOverlappingPairs } from './challenges/04/campCleanup';
import { findStartOfMessage, findStartOfPacket } from './challenges/06/tuningTrouble';
import { getDirectoryToDeleteSize, sumDirectoriesBelow100k } from './challenges/07/noSpaceLeftOnDevice';
import { countVisibleTrees, getMaxScenicScore } from './challenges/08/treeHouse';
import { countTailPositions } from './challenges/09/ropeBridge';

const input = async (file: string) => getFileLines(`challenges/${file}`, import.meta.url);

const input01 = await input('01/01-input.txt');
const input02 = await input('02/02-input.txt');
const input03 = await input('03/03-input.txt');
const input04 = await input('04/04-input.txt');
const input05 = await input('05/05-input.txt');
const input06 = await input('06/06-input.txt');
const input07 = await input('07/07-input.txt');
const input08 = await input('08/08-input.txt');
const input09 = await input('09/09-input.txt');

console.info('[CHALLENGE 01-1]', maxCalories(input01));
console.info('[CHALLENGE 01-2]', topThreeCalories(input01));

console.info('[CHALLENGE 02-1]', staticRockPaperScissors(input02));
console.info('[CHALLENGE 02-2]', dynamicRockPaperScissors(input02));

console.info('[CHALLENGE 03-1]', sumRucksackDuplicates(input03));
console.info('[CHALLENGE 03-2]', sumRucksackGroups(input03));

console.info('[CHALLENGE 04-1]', countEnclosedPairs(input04));
console.info('[CHALLENGE 04-2]', countOverlappingPairs(input04));

console.info('[CHALLENGE 05-1]', sortCratesHanoiStyle(input05));
console.info('[CHALLENGE 05-2]', sortCrates9001(input05));

console.info('[CHALLENGE 06-1]', findStartOfPacket(input06[0]));
console.info('[CHALLENGE 06-2]', findStartOfMessage(input06[0]));

console.info('[CHALLENGE 07-1]', sumDirectoriesBelow100k(input07));
console.info('[CHALLENGE 07-2]', getDirectoryToDeleteSize(input07));

console.info('[CHALLENGE 08-1]', countVisibleTrees(input08));
console.info('[CHALLENGE 08-2]', getMaxScenicScore(input08));

console.info('[CHALLENGE 09-1]', countTailPositions(input09));
