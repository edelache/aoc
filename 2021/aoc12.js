const _ = require('lodash');

const input = `zs-WO
zs-QJ
WO-zt
zs-DP
WO-end
gv-zt
iu-SK
HW-zs
iu-WO
gv-WO
gv-start
gv-DP
start-WO
HW-zt
iu-HW
gv-HW
zs-SK
HW-end
zs-end
DP-by
DP-iu
zt-start`;
const testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;
const testInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;
const testInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

const lines = input.split('\n').map(line => line.split('-'));

function isLowerCase(str) {
  return (str === str.toLowerCase()) ? true : false;
}

const nodes = {};
lines.forEach(line => {
  const [a, b] = line;
  if (!nodes[a]) {
    nodes[a] = {
      id: a,
      small: isLowerCase(a),
      paths: {},
      maxVisits: 1
    };
  }

  if (!nodes[b]) {
    nodes[b] = {
      id: b,
      small: isLowerCase(b),
      paths: {},
      maxVisits: 1
    };
  }

  if (!nodes[a].paths[b]) {
    nodes[a].paths[b] = nodes[b];
  }

  if (!nodes[b].paths[a]) {
    nodes[b].paths[a] = nodes[a];
  }
});

const trips = [];

function getPrintableTrips() {
  return trips.map(trip => {
    return trip.reduce((acc, {id}) => {
      acc.push(id);
      return acc;
    }, []).join(',');
  })
}

function traverse(node, path=[], visitMap={}) {
  path.push(node);
  if (!visitMap[node.id]) {
    visitMap[node.id] = 1;
  } else {
    visitMap[node.id]++;
  }

  Object.keys(node.paths).forEach(key => {
    const child = node.paths[key];
    if (!visitMap[child.id]) {
      visitMap[child.id] = 0;
    }

    if (child.id === 'end') {
      path.push(child);
      trips.push(path);
    } else if (child.id !== 'start'
        && (!child.small || visitMap[child.id] < child.maxVisits) ) {
      traverse(child, _.clone(path), _.clone(visitMap));
    }
  });
}

const smallCaves = [];
Object.keys(nodes).forEach(key => {
  const node = nodes[key];
  if (node.id !== 'start' && node.id !== 'end' && node.small) {
    smallCaves.push(node);
  }
});



smallCaves.forEach(cave => {
  cave.maxVisits = 2;
  Object.keys(nodes['start'].paths).forEach((key) => {
    traverse(nodes['start'].paths[key], [nodes.start]);
  });
  cave.maxVisits = 1;
});

// console.log(nodes);
const printableTrips = getPrintableTrips();

const uniqueTripMap = {};
printableTrips.forEach(t=> {
  uniqueTripMap[t] = 1;
})



console.log(Object.keys(uniqueTripMap).length);
