import { input, test } from './input/aoc7.js';

let hands = [];
const ranks = {
  'five-of-a-kind': 7,
  'four-of-a-kind': 6,
  'full-house': 5,
  'three-of-a-kind': 4,
  'two-pairs': 3,
  'one-pair': 2,
  'high-card': 1,
}

function determineType(cards, jokers=false) {
  const vals = {};
  const types = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }

  let numJs = 0;
  cards.forEach(card => {
    vals[card] = vals[card] ? vals[card] + 1 : 1;
    if (card === 'J' && jokers) {
      numJs++;
    }
  });

  Object.entries(vals).forEach(([card, num]) => {
    types[num]++;
  });

  switch (numJs) {
    case 0: {
      if (types[2] === 1 && types[3] === 1) {
        return 'full-house';
      } else if (types[2] === 2) {
        return 'two-pairs';
      } else if (types[2] === 1) {
        return 'one-pair';
      } else if (types[3] === 1) {
        return 'three-of-a-kind';
      } else if (types[4] === 1) {
        return 'four-of-a-kind';
      } else if (types[5] === 1) {
        return 'five-of-a-kind';
      } else if (types[1] === 5) {
        return 'high-card';
      }
    }

    case 1: {
      if (types[4] === 1) {
        return 'five-of-a-kind';
      } else if (types[3] === 1) {
        return 'four-of-a-kind';
      } else if (types[2] === 2) {
        return 'full-house';
      } else if (types[2] === 1) {
        return 'three-of-a-kind';
      } else {
        return 'one-pair';
      }
    }

    case 2: {
      if (types[2] === 2) { // the two J's are going to count as one pair as well
        return 'four-of-a-kind';
      } else if (types[3] === 1) {
        return 'five-of-a-kind';
      } else {
        return 'three-of-a-kind';
      }
    }

    case 3: {
      if (types[2] === 1) {
        return 'five-of-a-kind';
      } else {
        return 'four-of-a-kind';
      }
    }

    case 4:
    case 5:
      return 'five-of-a-kind';
  }

  return null;
}

function countCards(input, jokers=false) {
  const lines = input.split('\n');
  const cardLookup = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
  };

  if (jokers) {
    cardLookup.J = 1;
  }

  hands = lines.reduce((acc, line) => {
    const parts = line.split(' ');
    const cards = parts[0].split('');
    const type = determineType(cards, jokers);

    acc.push({
      cards,
      type,
      typeRank: ranks[type],
      bid: parseInt(parts[1])
    });

    return acc;
  }, []);

  hands.sort((a, b) => {
    const val = a.typeRank - b.typeRank;
    if (val === 0) {
      let diff;
      for (let i = 0; i < 5; i++) {
        diff = cardLookup[a.cards[i]] - cardLookup[b.cards[i]];
        if (diff !== 0) {
          break;
        }
      }
      return diff;
    }
    return val
  });

  let total = 0;
  hands.forEach((hand, index) => {
    hand.value = hand.bid * (index + 1);
    total += hand.value;
  });

  return total;
}


const part1answer = countCards(input, false);
console.log(`Part 1: `, part1answer);

const part2answer = countCards(input, true);
console.log(`Part 2: `, part2answer);
