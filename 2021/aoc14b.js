const input = `KHSSCSKKCPFKPPBBOKVF

OS -> N
KO -> O
SK -> B
NV -> N
SH -> V
OB -> V
HH -> F
HP -> H
BP -> O
HS -> K
SN -> B
PS -> C
BS -> K
CF -> H
SO -> C
NO -> H
PP -> H
SS -> P
KV -> B
KN -> V
CC -> S
HK -> H
FN -> C
OO -> K
CH -> H
CP -> V
HB -> N
VC -> S
SP -> F
BO -> F
SF -> H
VO -> B
FF -> P
CN -> O
NP -> H
KK -> N
OP -> S
BH -> F
CB -> V
HC -> P
KH -> V
OV -> V
NK -> S
PN -> F
VV -> N
HO -> S
KS -> C
FP -> F
FH -> F
BB -> C
FB -> V
SB -> K
KP -> B
FS -> C
KC -> P
SC -> C
VF -> F
VN -> B
CK -> C
KF -> H
NS -> C
FV -> K
HV -> B
HF -> K
ON -> S
CV -> N
BV -> F
NB -> N
NN -> F
BF -> N
VB -> V
VS -> K
BK -> V
VP -> P
PB -> F
KB -> C
VK -> O
NF -> F
FO -> F
PH -> N
VH -> B
HN -> B
FK -> K
PO -> H
CO -> B
FC -> V
OK -> F
OF -> V
PF -> F
BC -> B
BN -> O
NC -> K
SV -> H
OH -> B
PC -> O
OC -> C
CS -> P
PV -> V
NH -> C
PK -> H`;

const testInput =  `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

let [[template], rulesRaw] = input.split('\n\n').map(val => val.split('\n'));

const rules = {};
rulesRaw.forEach(rule => {
  const spl = rule.split(' -> ');
  rules[spl[0]] = { chr: spl[1], a: spl[0][0] + spl[1], b: spl[1] + spl[0][1] };
});

const counts = {};
function initCountMap() {
  Object.keys(rules).forEach(rule => {
    if (!counts[rule[0]]) {
      counts[rule[0]] = 0;
    }
    if (!counts[rule[1]]) {
      counts[rule[1]] = 0;
    }
  })
}
initCountMap();

console.log(rules);

function polymerize(polymers) {
  const newPolymers = {};
  Object.keys(polymers).forEach(polymer => {
    const rule = rules[polymer];
    const numOriginalPolymer = polymers[polymer];

    if (!newPolymers[rule.a]) {
      newPolymers[rule.a] = numOriginalPolymer;
    } else {
      newPolymers[rule.a] = newPolymers[rule.a] + numOriginalPolymer;
    }

    if (!newPolymers[rule.b]) {
      newPolymers[rule.b] = numOriginalPolymer;
    } else {
      newPolymers[rule.b] = newPolymers[rule.b] + numOriginalPolymer;
    }
  });
  return newPolymers;
}

let polymers = {};
for (let i = 0; i < template.length-1; i++) {
  polymers[template[i] + template[i+1]] = 1;
}

// console.log(polymers);
for (let i = 0; i < 40; i++) {
  polymers = polymerize(polymers);
  // console.log(polymers);
}


Object.keys(polymers).forEach(pk => {
  counts[pk[0]] += polymers[pk];
  counts[pk[1]] += polymers[pk];
})


let max = 0;
let min = 9999999999999999;

Object.keys(counts).forEach(key => {
  counts[key] = Math.ceil(counts[key] / 2);
});

Object.keys(counts).forEach(key => {
  const val = counts[key];
  if (val > max) {
    max = val;
  }
  if (val < min) {
    min = val;
  }
});

console.log(counts);
console.log(max - min);

// NCNBCHB
// { NC: 1, CN: 1, NB: 1, BC: 1, CH: 1, HB: 1 }
// N: 2,
// C: 2,
// B: 2,
// H: 1
// NBCCNBBBCBHCB
// { NB: 2, BC: 2, CC: 1, CN: 1, BB: 2, CB: 2, BH: 1, HC: 1 }


// NB
// BC
// CC
// CN
// NB
// BB
// BB
// BC
// CB
// BH
// HC
// CB

// { NB: 2, BC: 2, CC: 1, CN: 1, BB: 2, CB: 2, BH: 1, HC: 1 }
