import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { getSmallerTuningFrequency, sumNoBeaconPositionsInLine10 } from './beaconExclusion';

describe('15', async () => {
    const example = await getFileLines('15-example.txt', import.meta.url);

    describe('sumNoBeaconPositionsInLine10', () => {
        it('should count the positions in line 10 where no beacon can be placed', () => {
            expect(sumNoBeaconPositionsInLine10(example)).toBe(26);
        });
    });

    describe('getSmallerTuningFrequency', () => {
        it('should return the tuning frequency of the elusive beacon', () => {
            expect(getSmallerTuningFrequency(example)).toBe(56000011);
        });
    });
});
