var ortools = require('node_or_tools');

const round = num =>
    parseFloat(Math.round(num * 100) / 100).toFixed(2);

const print2d = (arr, title) => {
    if (title)
        console.log(title);

    let str = '';
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            str += round(arr[i][j]) + ' '
        }
        str += '\n';
    }
    console.log(str);
}

const fill2d = (n, val) =>
    [...Array(n)]
        .map(i => [...Array(n)]
            .map(j => val));

const findPath = (endtime, startpos, n, costs, durations, windows) => {
    console.log('durations: ' + durations);

    let durationComposite = fill2d(n, 0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            durationComposite[i][j] = costs[i][j] + durations[i];
        }
    }


    console.log('endtime: ' + endtime);
    console.log('startpos: ' + startpos);
    console.log('n: ' + n);

    print2d(costs, 'costs');
    print2d(durationComposite, 'durations');
    print2d(windows, 'windows');

    const createOpts = {
        numNodes: n,
        costs: costs,
        durations: durationComposite,
        timeWindows: windows,
        demands: fill2d(n, 0)
    };

    const searchOpts = {
        computeTimeLimit: 10000,
        numVehicles: 1,
        depotNode: startpos,
        timeHorizon: endtime,
        vehicleCapacity: 2147483647,
        routeLocks: [[]],
        pickups: [],
        deliveries: []
    };
    return new Promise((resolve, reject) => {
        const vrp = new ortools.VRP(createOpts);

        vrp.Solve(searchOpts, (err, solution) => {
            if (err)
                reject(err);
            else
                resolve(solution);
        })
    });
};

const points = [
    [1, 1],
    [1, 9],
    [3, 7],
    [6, 8],
    [6, 5],
    [4, 5],
    [1, 5],
    [5, 1]
];

const n = points.length;
const endtime = 9;

let costs = [];
for (let i = 0; i < n; i++)
    costs.push([]);

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        const a = points[i];
        const b = points[j];
        const dx = Math.abs(a[0] - b[0]);
        const dy = Math.abs(a[1] - b[1]);
        const distance = Math.sqrt(dx ** 2 + dy ** 2) / 5;
        // 5 is a constant that represents the time to travel 1 unit
        costs[i][j] = distance;
    }
}

let times = [];
for (let i = 0; i < n; i++)
    times.push([0, endtime])

/*
const durations = fill2d(n, 1);
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        durations[i][j] += costs[i][j];
    }
}
*/
let durations = [];
for (let i = 0; i < n; i++) {
    durations.push(1);
}


findPath(endtime, 0, n, costs, durations, times)
    .then(res => {
        console.log(res);
        let route = res.routes[0];
            let time = 0;
            for (var i = 0; i < route.length - 1; i++)
                time += durations[route[i]][route[i + 1]];
            console.log('route only time:' + time);
        {
            route.unshift(0);
            route.push(0);
            let time = 0;
            for (var i = 0; i < route.length - 1; i++)
                time += durations[route[i]][route[i + 1]];
            console.log('total time:' + time);
        }
    })
    .catch(err => console.log(err));


