type Position = { x: number; y: number };

const manhattan = ({ x: x1, y: y1 }: Position, { x: x2, y: y2 }: Position) => {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    return dx + dy;
};

const isAt = (pos1: Position, pos2: Position) => pos1.x === pos2.x && pos1.y === pos2.y;

class Sensor {
    public readonly position: Position;
    private readonly beacon: Position;
    public readonly distance: number;
    public readonly minX: number;
    public readonly maxX: number;
    public readonly minY: number;
    public readonly maxY: number;

    constructor(position: Position, beacon: Position) {
        this.position = position;
        this.beacon = beacon;
        this.distance = manhattan(this.position, this.beacon);
        this.minX = position.x - this.distance;
        this.maxX = position.x + this.distance;
        this.minY = position.y - this.distance;
        this.maxY = position.y + this.distance;
    }

    blocks(position: Position) {
        return manhattan(this.position, position) <= this.distance;
    }
}

const rgx = /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/;

const parseLine = (line: string): [number, number, number, number] => {
    const [_, x, y, bx, by] = line.match(rgx);
    return [x, y, bx, by].map((c) => parseInt(c, 10)) as [number, number, number, number];
};

type Cave = { sensors: Sensor[]; beacons: Position[]; minX: number; maxX: number };

const scanCave = (lines: string[]): Cave => {
    const sensors: Sensor[] = [];
    const beacons: Position[] = [];
    let minX = 0;
    let maxX = 0;

    for (const line of lines) {
        const [x, y, bx, by] = parseLine(line);
        const beacon = { y: by, x: bx };
        const sensor = new Sensor({ y, x }, beacon);
        sensors.push(sensor);
        minX = Math.min(minX, x - sensor.distance, bx);
        maxX = Math.max(maxX, x + sensor.distance, bx);
        beacons.push(beacon);
    }

    return { sensors, beacons, minX, maxX };
};

const isBeacon = (position: Position, beacons: Position[]) => beacons.some((beacon) => isAt(position, beacon));
const isSensor = (position: Position, sensors: Sensor[]) => sensors.some((sensor) => isAt(position, sensor.position));
const blockedBy = (position: Position, sensors: Sensor[]) => sensors.find((sensor) => sensor.blocks(position));

const sumNoBeaconPositions = (y: number) => (lines: string[]) => {
    const { sensors, beacons, minX, maxX } = scanCave(lines);

    let blocked = 0;
    for (let x = minX; x <= maxX; x++) {
        const position = { x, y };
        if (!isBeacon(position, beacons) && !isSensor(position, sensors) && blockedBy(position, sensors)) {
            blocked++;
        }
    }

    return blocked;
};

export const sumNoBeaconPositionsInLine10 = sumNoBeaconPositions(10);
export const sumNoBeaconPositionsInLine2000000 = sumNoBeaconPositions(2000000);

const FREQ_MULTIPLICATOR = 4000000;

const getBlockedUntilX = (position: Position, sensor: Sensor, size: number) => {
    const dy = Math.abs(sensor.position.y - position.y);
    return Math.min(size, sensor.position.x + sensor.distance - dy);
};

const getTuningFrequency = (size: number) => (lines: string[]) => {
    const { sensors } = scanCave(lines);

    let beacon: Position;
    all: for (let y = 0; y <= size; y++) {
        for (let x = 0; x <= size; x++) {
            if (sensors.some(({ minX, maxX }) => minX <= x && x <= maxX)) {
                const position: Position = { x, y };
                const blockingSensor = blockedBy(position, sensors);
                if (blockingSensor) {
                    x = getBlockedUntilX(position, blockingSensor, size);
                } else {
                    beacon = position;
                    break all;
                }
            }
        }
    }

    return beacon.x * FREQ_MULTIPLICATOR + beacon.y;
};

export const getSmallerTuningFrequency = getTuningFrequency(20);
export const getFullSizedTuningFrequency = getTuningFrequency(4000000);
