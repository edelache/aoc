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
// template = template.split('');
const rules = {};
rulesRaw.forEach(rule => {
  const spl = rule.split(' -> ');
  rules[spl[0]] = spl[1];
});

let tmplParts = [];
for (let i = 0; i < template.length-1; i++) {
  tmplParts.push(template.substring(i, i+2));
}

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


// for (let i = 0; i < 40; i++) {
//   template = template.reduce((acc, a, index) => {
//     let b = template[index+1];
//     let newChar = rules[a+b];

//     if (!b) {
//       acc.push(a);
//       return acc;
//     }

//     acc.push(a[0])
//     acc.push(newChar);

//     return acc;
//   }, []);
// }

for (let i = 0; i < template.length; i++) {
  counts[template[i]]++;
}

function deepDive(tmpl, level=0) {
  if (level == 10)
    return null;
  for (let i = 0; i < tmpl.length-1; i++) {
    const newChar = rules[tmpl[i] + tmpl[i+1]];
    counts[newChar]++;
    deepDive(tmpl[i] + newChar + tmpl[i+1], level + 1);
  }
}

deepDive(template);
console.log(counts);



// const counts = {};
// template.forEach(c => {
//   if (!counts[c]) {
//     counts[c] = 0;
//   }
//   counts[c]++;
// })

let max = 0;
let min = 999999999;

Object.keys(counts).forEach(key => {
  const val = counts[key];
  if (val > max) {
    max = val;
  }
  if (val < min) {
    min = val;
  }
});

console.log(max - min);
