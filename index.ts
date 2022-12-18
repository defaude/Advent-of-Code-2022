import chalk from 'chalk';
import { getFileLines } from './utility/getFileLines';
import { maxCalories, topThreeCalories } from './challenges/01/calorieCount';
import { dynamicRockPaperScissors, staticRockPaperScissors } from './challenges/02/rockPaperScissors';
import { sumRucksackDuplicates, sumRucksackGroups } from './challenges/03/rucksack';
import { sortCrates9001, sortCratesHanoiStyle } from './challenges/05/supplyStacks';
import { countEnclosedPairs, countOverlappingPairs } from './challenges/04/campCleanup';
import { findStartOfSingleMessage, findStartOfSinglePacket } from './challenges/06/tuningTrouble';
import { getDirectoryToDeleteSize, sumDirectoriesBelow100k } from './challenges/07/noSpaceLeftOnDevice';
import { countVisibleTrees, getMaxScenicScore } from './challenges/08/treeHouse';
import { countMultiKnotTailPositions, countTailPositions } from './challenges/09/ropeBridge';
import { paintPixelLetters, sumRegisterForGivenCycles } from './challenges/10/cathodeRayTube';
import {
    getMonkeyBusinessAfter20RoundsWithRelief,
    getMonkeyBusinessWithoutRelief,
} from './challenges/11/monkeyInTheMiddle';
import { getMinimumStepsToBestSignal, getShortestHike } from './challenges/12/hillClimbing';
import { multiplySeparatorPacketIndices, sumCorrectlyOrderedPairsIndices } from './challenges/13/distressSignal';
import { countAllTheSands, countRestingSands } from './challenges/14/regolith';
import { getFullSizedTuningFrequency, sumNoBeaconPositionsInLine2000000 } from './challenges/15/beaconExclusion';
import { calcMostReleasedPressure } from './challenges/16/proboscideaVolcanium';

const input = async (day: string) => getFileLines(`challenges/${day}/${day}-input.txt`, import.meta.url);

const logDay = (day: string, outputs: [unknown, unknown]) => {
    console.log(chalk.cyan.bold(`Day ${day}`), chalk.cyan(`Part 1 =>`), chalk.yellow.bold(outputs[0]));
    console.log(chalk.cyan.bold(`Day ${day}`), chalk.cyan(`Part 2 =>`), chalk.yellow.bold(outputs[1]));
};

type Challenge = (lines: string[]) => unknown;

const noop: Challenge = () => 'N/A';

const runDay = async (day: string, fn1: Challenge = noop, fn2: Challenge = noop) => {
    const lines = await input(day);
    logDay(day, [fn1(lines), fn2(lines)]);
};

await runDay('01', maxCalories, topThreeCalories);
await runDay('02', staticRockPaperScissors, dynamicRockPaperScissors);
await runDay('03', sumRucksackDuplicates, sumRucksackGroups);
await runDay('04', countEnclosedPairs, countOverlappingPairs);
await runDay('05', sortCratesHanoiStyle, sortCrates9001);
await runDay('06', findStartOfSinglePacket, findStartOfSingleMessage);
await runDay('07', sumDirectoriesBelow100k, getDirectoryToDeleteSize);
await runDay('08', countVisibleTrees, getMaxScenicScore);
await runDay('09', countTailPositions, countMultiKnotTailPositions);
await runDay('10', sumRegisterForGivenCycles, paintPixelLetters);
await runDay('11', getMonkeyBusinessAfter20RoundsWithRelief, getMonkeyBusinessWithoutRelief);
await runDay('12', getMinimumStepsToBestSignal, getShortestHike);
await runDay('13', sumCorrectlyOrderedPairsIndices, multiplySeparatorPacketIndices);
await runDay('14', countRestingSands, countAllTheSands);
await runDay('15', sumNoBeaconPositionsInLine2000000, getFullSizedTuningFrequency);
await runDay('16', calcMostReleasedPressure);
