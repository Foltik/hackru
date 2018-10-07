var ortools = require('node_or_tools');

const fill = (n, val) =>
    [...Array(n)].map(() => val);

const fill2d = (n, val) =>
    [...Array(n)].map(fill(n, val));

const compositeDurations = (costs, durations) => {
    let composite = costs.slice(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            composite[i][j] += durations[i];
        }
    }
    return composite;
};


// First node is assumed to be the start/ending node (not a POI)
// deltaTime: total time constraint
// n: number of POIs
// costs: 2d array where [i, j] is distance from i to j
// durations: array where [i] is the time spent at i
// windows: array of pairs where [i] contains [a, b] where a and b are start and end time windows
const findPath = (endTime, n, costs, durations, windows) => {
    const createOpts = {
        numNodes: n,
        costs: costs,
        durations: compositeDurations(costs, durations),
        timeWindows: windows,
        demands: fill2d(n, 0)
    };

    const searchOpts = {
        computeTimeLimit: 10000,
        numVehicles: 1,
        depotNode: 0,
        timeHorizon: endTime,
        vehicleCapacity: 2147483647,
        routeLocks: [[]],
        pickups: [],
        deliveries: []
    };

    return new Promise((resolve, reject) => {
        const vrp = new ortools.VRP(createOpts);
        vrp.Solve(searchOpts, (err, solution) => err ? reject(err) : resolve(solution))
    });
};

module.exports.findPath = findPath;