const input = `76
51
117
97
7
77
63
18
137
10
23
14
130
131
8
91
17
29
2
36
110
35
113
30
112
61
83
122
28
75
124
82
101
135
42
44
128
32
55
85
119
114
72
111
107
123
54
3
98
96
11
62
22
49
37
1
104
43
24
31
129
69
4
21
48
39
9
38
58
125
81
89
65
90
118
64
25
138
16
78
92
102
88
95
132
47
50
15
68
84
136
103`;

const input3 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const input2 = `16
10
15
5
1
11
7
19
6
12
4`;

const lines = input.split('\n');
let max=0;
const jolts = [0];

for (let i = 0; i < lines.length; i++) {
  const val = parseInt(lines[i]);
  jolts.push(val);
  if (val > max) {
    max = val;
  }
}
jolts.sort((a, b) => {
  return (a > b) ? 1:-1
});


const lastAdapter = max + 3;
jolts.push(lastAdapter)

function calcDifferentials(jolts) {
  const differentials = []
  for (let i = 0; i < jolts.length-1; i++) {
    differentials.push(jolts[i+1] - jolts[i])
  }
  return differentials
}


const differentials = calcDifferentials(jolts);
const diffLength = differentials.length;

function countPaths(pos=0) {
  let total = 0;
  if (pos >= diffLength) {
    return 1;
  }

  if (differentials[pos] === 3) {
    total += countPaths(pos+1);
  } else {
    total += countPaths(pos+1);
    if (differentials[pos+1] === 1) {
      total += countPaths(pos+2);

      if (differentials[pos+2] === 1) {
        total += countPaths(pos+3);
      }
    }
  }
  return total;
}
total = countPaths();

console.log(`total paths: ${total}`);

