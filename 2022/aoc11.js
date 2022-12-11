const input = `Monkey 0:
Starting items: 63, 84, 80, 83, 84, 53, 88, 72
Operation: new = old * 11
Test: divisible by 13
  If true: throw to monkey 4
  If false: throw to monkey 7

Monkey 1:
Starting items: 67, 56, 92, 88, 84
Operation: new = old + 4
Test: divisible by 11
  If true: throw to monkey 5
  If false: throw to monkey 3

Monkey 2:
Starting items: 52
Operation: new = old * old
Test: divisible by 2
  If true: throw to monkey 3
  If false: throw to monkey 1

Monkey 3:
Starting items: 59, 53, 60, 92, 69, 72
Operation: new = old + 2
Test: divisible by 5
  If true: throw to monkey 5
  If false: throw to monkey 6

Monkey 4:
Starting items: 61, 52, 55, 61
Operation: new = old + 3
Test: divisible by 7
  If true: throw to monkey 7
  If false: throw to monkey 2

Monkey 5:
Starting items: 79, 53
Operation: new = old + 1
Test: divisible by 3
  If true: throw to monkey 0
  If false: throw to monkey 6

Monkey 6:
Starting items: 59, 86, 67, 95, 92, 77, 91
Operation: new = old + 5
Test: divisible by 19
  If true: throw to monkey 4
  If false: throw to monkey 0

Monkey 7:
Starting items: 58, 83, 89
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 1`;
const ex = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const monkiesRaw = input.split('\n\n');
const monkies = [];

monkiesRaw.forEach((monkeyRaw, monkeyNum) => {
  const parts = monkeyRaw.split('\n');
  const items = parts[1].split(': ')[1].split(', ').map(item => parseInt(item));
  const opParts = parts[2].split(': ')[1].split(' ');
  const op = opParts[3];
  const valInt = parseInt(opParts[4]);
  const val = isNaN(valInt) ? opParts[4] : valInt;
  const test = parseInt(parts[3].split(': ')[1].split(' ')[2]);
  const ifTrue = parseInt(parts[4].split(': ')[1].split(' ')[3]);
  const ifFalse = parseInt(parts[5].split(': ')[1].split(' ')[3]);

  monkies.push({
    monkeyNum,
    items,
    op,
    val,
    test,
    ifTrue,
    ifFalse,
    inspCount: 0
  })
});

const ops = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
}

const magicFactor = monkies.reduce((acc, monkey) => monkey.test * acc, 1);

function turn(monkey, round) {
  const len = monkey.items.length;
  for (let i = 0; i < len; i++) {
    monkey.inspCount++;
    const item = monkey.items.shift();

    let newWorry = ops[monkey.op](item, monkey.val === 'old' ? item : monkey.val);

    if (newWorry > magicFactor) {
      newWorry %= magicFactor;
    }

    if (newWorry % monkey.test === 0) {
      monkies[monkey.ifTrue].items.push(newWorry);
    } else {
      monkies[monkey.ifFalse].items.push(newWorry);
    }
  };
}

for (let round = 0; round < 10000; round++) {
  monkies.forEach(monkey => {
    turn(monkey, round);
  });
}

console.log(monkies.map(monkey => monkey.inspCount))

const orderedMonkies = monkies.sort((a, b) => b.inspCount - a.inspCount);
console.log(`Part 1: ${orderedMonkies[0].inspCount * orderedMonkies[1].inspCount}`);
