import { describe, expect, it } from 'bun:test';
import { getFileLines } from '../../utility/getFileLines';
import { exteriorSurfaceArea, surfaceArea } from './boilingBoulders';

describe('18', async () => {
    const example = await getFileLines('18-example.txt', import.meta.url);

    describe('surfaceArea', () => {
        it('should calculate the surface area of the lava droplet', () => {
            expect(surfaceArea(example)).toBe(64);
        });
    });

    describe('exteriorSurfaceArea', () => {
        it.skip('should calculate the surface area of the lava droplet', () => {
            expect(exteriorSurfaceArea(example)).toBe(58);
        });
    });
});
