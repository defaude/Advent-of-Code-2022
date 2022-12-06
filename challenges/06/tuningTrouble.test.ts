import { describe, expect, it } from 'vitest';
import { getFileLines } from '../../utility/getFileLines';
import { findStartsOfMessages, findStartsOfPackets } from './tuningTrouble';

describe('06', async () => {
    const example = await getFileLines('06-example.txt', import.meta.url);

    describe('findStartsOfPackets', () => {
        it('should return the amount of groups where one is fully enclosed in the other one', () => {
            expect(findStartsOfPackets(example)).toEqual([7, 5, 6, 10, 11]);
        });
    });

    describe('findStartsOfMessages', () => {
        it('should return the amount of groups where one is fully enclosed in the other one', () => {
            expect(findStartsOfMessages(example)).toEqual([19, 23, 23, 29, 26]);
        });
    });
});
