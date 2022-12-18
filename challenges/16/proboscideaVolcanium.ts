class Valve {
    constructor(public name: string, public flowRate: number, public connectedNames: string[]) {}

    connected(valves: VM) {
        return this.connectedNames.map((name) => valves.get(name));
    }

    getPaths(valves: VM, paths: PM = new Map(), through: string[] = []): Path[] {
        const distance = through.length;
        const previousPath = paths.get(this.name);

        if (previousPath && previousPath.distance < distance) {
            return [];
        }

        paths.set(this.name, {
            to: this.name,
            through: through.slice(1),
            connections: this.connectedNames.length,
            distance,
            flowRate: this.flowRate,
        });

        const connected = this.connected(valves).filter((v) => v.name !== this.name);
        for (const valve of connected) {
            valve.getPaths(valves, paths, [...through, this.name]);
        }

        return Array.from(paths.values());
    }
}

type Path = {
    to: string;
    connections: number;
    through: string[];
    distance: number;
    flowRate: number;
};

type VM = Map<string, Valve>;
type PM = Map<string, Path>;

//region input parsing
// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
const rgx = /^Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.+)$/;

const parse = (line: string): Valve => {
    const [_, name, flowRateStr, connectionsStr] = line.match(rgx);
    const flowRate = parseInt(flowRateStr, 10);
    const connections = connectionsStr.split(', ');

    return new Valve(name, flowRate, connections);
};

const getValves = (lines: string[]) => {
    const result: Map<string, Valve> = new Map();

    for (const line of lines) {
        const valve = parse(line);
        result.set(valve.name, valve);
    }

    return result;
};
//endregion

const potential = (path: Path, remainingSteps: number) => path.flowRate * (remainingSteps - path.distance - 1);

const comparePaths = (a: Path, b: Path) => {
    const minutes = Math.max(a.distance, b.distance) + 2;
    const aPot = potential(a, minutes);
    const bPot = potential(b, minutes);
    return bPot - aPot;
};

class Walker {
    private releasedPressure = 0;

    constructor(
        private valves: VM,
        private currentPosition = 'AA',
        private remainingMinutes = 30,
        private opened: string[] = []
    ) {}

    private currentValve() {
        return this.valves.get(this.currentPosition);
    }

    private getBestPath(paths: Path[]) {
        return paths
            .filter(({ distance, flowRate, to }) => this.canOpen(to) && distance + 2 < this.remainingMinutes)
            .sort(comparePaths)[0];
    }

    moveTo(name: string) {
        if (this.remainingMinutes < 2) {
            throw new Error('makes no sense to move when less than 2 minutes are left');
        }

        if (!this.currentValve().connectedNames.includes(name)) {
            throw new Error(`can not move to ${name} because it's not connected to ${this.currentPosition}`);
        }

        this.tick(`Moving to ${name}`);

        this.currentPosition = name;
    }

    canOpen(name = this.currentPosition) {
        if (this.remainingMinutes < 2 || this.opened.includes(name)) {
            return false;
        }

        return this.valves.get(name).flowRate !== 0;
    }

    openCurrentValve() {
        this.tick(`Opening valve ${this.currentPosition}`);
        this.opened.push(this.currentPosition);
    }

    nop() {
        this.tick('NOP');
    }

    private tick(message: string) {
        const released = this.opened.reduce((acc, name) => {
            const { flowRate } = this.valves.get(name);
            return acc + flowRate;
        }, 0);
        const pos = this.currentPosition;
        const minutes = ('' + this.remainingMinutes).padStart(2);
        console.log(`At ${pos} / ${minutes} minutes => ${message}. Releasing ${released}`);

        this.remainingMinutes--;
        this.releasedPressure += released;
    }

    releasePressure() {
        while (this.remainingMinutes > 0) {
            const paths = this.currentValve().getPaths(this.valves);
            const path = this.getBestPath(paths);

            if (path) {
                let distanceUntilTargetValve = path.distance;
                for (const name of path.through) {
                    this.moveTo(name);
                    const currentValve = this.currentValve();
                    distanceUntilTargetValve--;
                    if (
                        this.remainingMinutes - distanceUntilTargetValve > 2 &&
                        this.canOpen(name) &&
                        currentValve.flowRate * distanceUntilTargetValve > this.valves.get(path.to).flowRate
                    ) {
                        this.openCurrentValve();
                    }
                }

                this.moveTo(path.to);
                this.openCurrentValve();
            } else {
                this.nop();
            }
        }

        return this.releasedPressure;
    }
}

export const calcMostReleasedPressure = (lines: string[]) => {
    const valves = getValves(lines);
    const walker = new Walker(valves);
    return walker.releasePressure();
};
