class Valve {
    public open = false;

    constructor(public name: string, public flowRate: number, private connectedNames: string[]) {}

    connected(valves: VM) {
        return this.connectedNames.map((name) => valves.get(name));
    }

    getPaths(valves: VM, paths?: PM, through: string[] = []): PM {
        paths = paths ?? new Map();
        paths.set(this.name, {
            to: this.name,
            through,
            distance: through.length,
            flowRate: this.flowRate,
            open: this.open,
        });

        const connected = this.connected(valves).filter((v) => !paths.has(v.name));
        for (const valve of connected) {
            valve.getPaths(valves, paths, [...through, this.name]);
        }

        return paths;
    }
}

type Path = {
    to: string;
    through: string[];
    distance: number;
    flowRate: number;
    open: boolean;
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

const potential = (path: Path, remainingSteps: number) => {
    return path.flowRate * (remainingSteps - path.distance - 1);
};

const getBestPath = (paths: PM, remainingSteps: number): Path => {
    const sorted = Array.from(paths.values())
        .filter((p) => !p.open && p.flowRate > 0)
        .filter((p) => p.distance + 2 < remainingSteps)
        .sort((a, b) => potential(b, remainingSteps) - potential(a, remainingSteps));
    return sorted[0];
};

const releasedPressure = (valves: VM) => {
    let valve = valves.get('AA');
    let remainingSteps = 30;
    let pressureReleased = 0;

    while (remainingSteps > 0) {
        let paths = valve.getPaths(valves);
        const path = getBestPath(paths, remainingSteps);
        if (!path) break;

        valve = valves.get(path.to);
        console.info(`${path.through} ${remainingSteps}, ${path.distance}`);
        remainingSteps = remainingSteps - path.distance - 1;
        pressureReleased += path.flowRate * remainingSteps;
        valve.open = true;
    }

    return pressureReleased;
};

export const calcMostReleasedPressure = (lines: string[]) => {
    const valves = getValves(lines);
    return releasedPressure(valves);
};
