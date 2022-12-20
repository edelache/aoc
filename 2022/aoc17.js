const _ = require('lodash');
const fs = require('fs');

const input = `>>><<<>>>><<<>><<<<><>>><>>>><<><<<>>><<<><<<>>>><<<<>>><<>>>><<<>>>><<<<><>>>><<<>><<<>>><<><<<><>>>><>>>><<><<<<>>><<>>>><<<<>><<<<><<<>>><<<>><<<>><>>><<<<>>><<>>><<><<<<>>>><<<<><<<<>>><<>><<><<><<>>><<<><<<<>>>><<<><<<><><<><>>><<<<>><<<<>>>><><<<<>><>>>><<<<>>><<<>>>><<<<>>>><<<><>>>><>>>><<>>><<>>>><>>>><<><<<<>>><>>>><>>>><<<<>><<<>><<><<><<<><<><>><<<><<><<>>>><<>>><<>>>><>>><<<<>>>><<>><<<<><<>><><<<>><<<>>><<>>><<<><<<<><<>>><<<><<<<>>><<><<<<><<<<>><<<>><><>>>><><<<>>><<<>><<<<>>>><><<<<><<<>><<><<<>>>><<><<<>>>><<>>>><><>>><<>>><<<>>>><<<><<<><<<<>>><<<>>>><<<><>>>><<>>>><<<>>><<<<>><<<<>>>><><<<>>><<<<>>>><><>>>><>><>><<<>>><<<<><<<<><<<<>>>><<<>>>><>>>><<<<>>>><<>>><<><<<><<<><<<>>><<<>><<<><<<>>>><<<>><<>><<><<>><<<<>><<<<>><>><<>><<<<>>>><><<<<>><>><><<<>>><<<<>><>>>><<>>>><>><>>><<>><<><<<<>>><<<>>><>>><<><>>><<<<><><<<>>>><<<<><<<>>><><<<<><><<>>><<<><><><<>>><><><<>>>><<<>>>><<<>>><<>>>><>>><<<<>>>><>>>><<><<<>>><<<>>>><<>><<<<>>>><<<<>>><<<<><<<>><<>><<>>>><><<<>>>><<<>>>><<<<>><<<<>>>><>>>><<<>>>><><<>><>><<<><><<<<>>>><>>>><<<<>>><<<><<<><<<<>>>><<><<<>>>><<>>><<>><><<>><<<<>>><<>><<<><<<>><<<<><<><<<>>><><>><<<>><<<<>>>><<<>>><<>>><>><>><<<>><<<><<<><<><<>>>><<<<>>>><<<<>><<>><<>><<<>><<><<<><>>><<><>>><<>>>><>>>><><<><>><>><>>>><<<<>>><><<<<>>>><>>>><>>><<<>>>><<><<<<>><<<>>><<>>><<>><<<<>>>><<<>>>><<<>>><<<>>><><<<>><<>>><<<<>>>><>>>><<<>>>><<<>><>><<<>>>><<<>>>><<>>>><<<<>><><>>><<>><<<<><<<<>><<<<>><<<>>>><<<><<>><<>><<<<>><<>>><<<<>>><<<>>><<<<><<<<><<><<<>>>><>>><>>><<>><>>><<<<>>>><<<><>><<><<<<><>><<<><<>>>><<<><<<<>>>><<>>><><>>><<<>>>><><<>><<<>>>><>>>><<>><<<>>><<<<>>><<><>>><>><<<<>><<>>>><<<<>>>><<<>><>><<<>>><<<>>>><<<<><<><>><<<>><<><<<<>>>><<<>>><<><<<<><>><<<><<<><<<<>>><>><<<<><<<>><<<<>><>><<<<><<>><><<<>>><<<<>>><><<<<><>><><<>>>><>>>><<<<>>><<>>><<>>>><<<><<>>><<><<<<>>><<<>>><>><<<<>>><<>><<<>>><<>>>><<>><<<<>>>><<>><<>>>><<>>>><<><<>><<<<>>>><<<<>>><<<<><>>>><<<>>><>>><<<<>>>><<>>><<<><<<><<<<>><>>><<<>>>><<>>><<<>>><<<<>><<<>><<><<<<>>>><>>>><<><>>><<<<><<><<<<><><<<<>>><<><<><<<>>>><<><<>>>><>>><>><<<<><<<>>>><<<<>><<>>><<<>>>><<>>>><<><<>>>><>><><<<<>>>><<><<>>><<><<<><<><>><<<<>>>><<<>>><<<>>>><<><>>>><<><<><<<<><<<<>>><<<><>>>><<<>><<>><<><>>>><<>><>>><<<<>>><<>>>><<<<>>><>>><<<>>>><<<>>>><<<<>>><<>>><>><<<<>><<<><<<>>>><<<><<<<>>><<>><>><<<>><<<>><>>>><<>><><>>><<><>><<<>>><<>>>><>>><<><<>>><<<<>><<<<>>><>>>><<<<>>><<<>><<<<>>><<<><<<>>>><>>>><>><<<<>><><<<><>>>><>>>><<>>><<>>><<>>><<<><<>><<<>>>><>><>><<<<>>>><<>>><<>>>><>>><>><<>>><<<<>>>><<<>><<<><<<><<>>><<>><>>><<>>><<<<>><<<<><<>><<<<>>><<>>><><<>>><<<<>>><<<<>><<<<>><<<>>>><<<>>>><<<<>>><<<><<><<>>><<<>>>><<>>>><<<<>>><<<<>><<><<<<>>><><<<>><>>><<>>><<><<><<><<<<>>><<<><<<<><<<<><<<<>><>><<<<>>>><>>><<<<>><<><<>><<<>><<>>>><<<<>>>><<>><>><<><>>><<>><<<>><<>>><<<>>><<><<<<><><<>><<>>><<<>>>><<<<>>><<><<<>>>><<<<><<<<><>>>><<<>>>><<<>>><>>>><<<<>>>><<<<>><<>>><<>>>><<><<>>><<>>>><<<<><>>><<>>><>>>><<<>>><<<<>><<<<>><<<>><><<>>><<<>>><<<<>>>><<>>><<<<><<<<>>>><<<>>><<<><<>>><>><>>><<<<>>>><>><<<<>><>><<<<>>>><<<>><<>><<<>><<<><<<<>>>><<<<>><>>>><>><<<>>>><>>><>><<<><<<>><<<<>>><<<<>>><<>><<<><<<>>><<<>><<>>><<<<>>><<><<<>>><<><<><<<<>><>><<><<<<>><>>>><<><<<>>><<<>><><<<<>><<<>>>><<<>><<<>>><>><>>><<<>>>><>>><<<><<<>>>><<<>><<>>><>>>><<<<>>><<><<<<><<<>>><<<<>>>><<<<><>><<<><<<<>>><<>>>><<><<><>>>><>>>><<<<>>>><<<<>>><>>>><>><<<>>>><<<>>>><<>>>><<><<<<>>>><<<<><>><<<<><>>><<<>><>><>>>><><<<<><<<>>><<<<>><<<><<<<>>>><<<><<<>>>><><<<>>>><<<>><<<>><<<<>>><<<>>>><<<>>><>><<><<<>>><<>>><<><>><<<>>>><<>>>><<<>>>><<<<>>>><<<>>>><<>><>>>><<<><<>><<<><<<>><><>>><<>><<<><>>><<<>><<<>>>><<><>>><>>>><<<<>>>><<<<>>>><>>><<<<>><<<<><<<>>><>>><>>><<<><><<<>><<<>>><<<>>><<<>>>><<<<>>>><<<<><>>>><<<>><>><<<<>><<><<<<><<<>><><<<<>><>>>><<<<>><<<<><<<>>><<><<<<>>>><>>><<><>><>>>><<>><<<<>><>>>><<>><<>><<<<>><<>>>><<<<>>><><<<>><<<<>>>><<<<>>><<<<><<>><<>><<>>><<><<<<>><<<<>>><<>><<<<>><<<>>><<<>>>><<>>><<>>>><<<>><<<>>><>><<<<>><<<<>>><<>>><>>>><<><<>>>><<<<>>>><<><><<<<>>>><<<<>>>><<<>>>><><>><<>>><<<><<<<>>><><<<<>>><>>><><<>><<<<>>>><<>>><>>><>>><<><<><<>>>><<><<<<>>>><<<>><>>>><<<><><>>><<><<<>>>><<<<>>>><<<<>>><<<<><>><<<<>><<<>>>><<<<><<>>><><>>>><<>>>><<<>>><<<>>>><<<<><<>><<><<<<>>>><<<<>><<<><<>><<<>><<<>>>><<<>>><<<<><<<>>>><<<>>>><<<>>>><><<><<>><<<<><<<>>>><>>><><<<<><<>>>><<<<><<<>><<><<<><<<<>>>><<><<>>><>><<<<><><<<<>>><<<<>><>>><>>>><<><<<<><<<>><<<<>>>><>>>><<<><>>><<<<><<>>><>>>><<>><<>>>><<<<>>>><<<<>><<>><<<>>><<<<>>>><>>>><<><<><<<><<>>>><<><<<<>><<<<>><<<<><<<<><<<<><><<<<>>><<<<>><<><<>>><<<<>><<<<>>>><>><<<>>>><<<<>>>><<>>><<>>><<>>><<<<>>><<<>><>><<<>>><<>><<<<>><<><<<>>>><>>>><>>>><<<><<<>><<<<>>><>>><<>><<<<>>>><>>>><<>>>><>>><<<<>>><>>>><<<>><>>>><<<>>>><>>>><<<>>>><<<>><>>>><<<<>>><><<<><<<>>>><<<<>>><<<>>>><<>>><>>>><<<><<<>><<>>><<<<>>>><<<<>><><<<><<<>><<><>><<<<>><<<>>><<<<>>><<<<><<<><>>>><<>>>><<<<>>><<>>><<<<><>>><<>>>><<>>><<>>>><>>>><<<>>><<<>>>><<<>>><<>>><<>>>><<>>><<<>>>><>>><<<<>>>><>><>><<>>><<>>>><<<>>>><<<>>><<<<>>>><<>>><<<>><><<>><<<<>>><<<<>>><<<<><<>>><<<<>>>><<>>><<<<>>>><<>>>><<>>><<<><<<<><<>>>><<<>><>>>><<<>>><>>><<<<>>>><>>>><<>>><<<<>>>><<<<><<<<>><<><>><<<<><>>>><>>><>><<<>>><<>>>><>>>><<><>><<<<>>>><<<><<<<>>><>>><<<>>><<<<><<>><><><>><>><<<<>><<<>>><>>><<<>><<>>>><<<>>><><<<>><<<><<<<>><>><>><>><>>>><>><><<<<>>><<<<>>>><<<<><<>><>><<>>>><>>>><<<<>>><<<>><>>>><<<>><<<>>>><<>>>><>>>><<>><>>><<<<><<<<>>><<<<>><>><>><<<<>>><>>><<<<><<<>>>><<<>>>><<<<>>>><>><<<>><<<><<<><><>><<<>><>>><<>>>><<<><<>><<<<><<<<><<<>><<<>><<<<><<<><<<<><<<>><<><<<>>><<<<>><><<<<>><<<>>><<<>>>><<>>><<>>>><<>>>><<<<>><<<<>>><>>><>><<><<<<><><<><<<>>>><>>>><<<<>>><<>>><<<>>>><<<<>>><<>>><<<>>><>>>><<<<>><<>>>><<<<>>><<>>><<<<>><><<>><<>>>><<>>><<>>>><<<<>>><<<<>>><><<<><<<<><>>><<<<>><>><<<<>>><<<>><>>>><<<<>>><<>>>><<<<><<><<<<>>><<<<>>>><<>><<<<>>><<><<<>><<<>>><>><<<<>><<<><>><<>><<>><<<<>>>><>>><<>>><<><<<>>>><<<<><>>><<<>>><<<<><<<>><<>>>><<<>>>><<><<>><<>><<<><<<<>>>><<><<<<>><><>>><><<<>>>><<<<><<>><>>><<>><>>><<<><<>>><<<<>><>><<<<>><<<<>>>><<<<><<<<><<<>><>>><<<>>><<<<>>>><<>><<>><<<>>><><<<<><<<<>>>><<<>>><<>>><<>><<<<>>>><<>>><<<><>>><>>><<>>><<>>>><<<<><<<<><<<><<<>><<<<>>><>>><>><><<<<>><<><<>>><>>><<<<>><<><<<<>><<<>>><><<>>><<><<<<>><<<<><<<><>>><<<>>>><<>><<<<>>>><<<>><<<>><<<<>>>><<<>><<<<>><<<>>>><<>><>>><<><<<<>><<>>>><<<>>>><<<>>>><>>><<<<><<<><>><<><<<>>>><>><<<<>>><<<<>>><<<>><<<>>><>>>><<<<>>><<<<>>>><<<<>><<>>><<<><<<<>>><>>><<>>><<<>>>><<<<>><>>>><<<<>>><><<<<><<<>><<<><<<<><<<>><<<<><<>><<<<>><><<<>>><>><<<>><<<><>>><<<<>>><<>>>><<>><<>>>><><>>>><>><<<<><<<<><<<<><><<<<>>>><<>>>><<>>><<>><<<>><<><>>>><<<<><<<><<>>>><<<>>>><<<><<<<>>><<>>><<<<>>><<>>><<<><<><>>>><<>>>><<<<>>>><<<>>>><<<<>>><><>><<>>><<<<>>><<<<>>><<<><<<>>><<<>>>><>><<><<>><>><>><><<<>>><<<<>>>><<<>>>><<<<>>><>><<<><<<<>>><<<<><<<<>>>><<<>>><<>>>><<<>>>><>><<<<><<<<><<<>>><>>>><>>>><<>>>><<<><<<><<<>>><<<<>>><<>>><>>>><<<<>>><<><<>><<<><<<><<<><<<<>>><<<>><<<<>>>><<<<><<<>>><<<><><><<<>>>><<<<>>>><<<<>><<>><<<<><>>><<<>><<>>>><<<>>>><>><<<<><><<>>>><<<>><<<<>><<>>><<<<>><><<<>><<>>>><<>>><<>>>><<<<><<<><<>>>><>>>><<<>>><<<<><<>>>><>>>><>>>><<<<><<>>><<<<><<>>>><<<>><<>><<<<>><<<><<<>><<><<>>><<>><<<<><<<>><>>>><<<<><<<>>>><<<>>>><<<>>>><<<<>>><<<>>><><<<<>>>><<>><<<<>>><<<>>><><>>>><<<>>><<><<><<>>>><<>><<<<>>><<<>>>><<<<>>>><>>><<<<>>>><<<<><<><<>>><<<><>><<><<<><>><<<<><<<>>>><<<<>>>><>>><<<>>><<<<>>><>>><<<<>>>><<<<>>><<<<><>><><<>><<<>>>><<<>><<>><<>>>><<<<>>><<<<>><<<<><<><<>>>><<>>>><<<<>>><<<<>><><<<<>>><<>>><<<<><<<<><<>>>><<>><<><>>>><<<<>>><<<>>><>>>><<<><<<>><<<<>>><<>>><<<<>>><>><<<><<><><<<>><<<><<>>>><<<<><<<><<<<>><<<<>><<>>>><<<<>><<>>>><<>><<<>><<>>>><<<<>>><<<<><>><<<>>>><><>>>><<<><<<>><>>><<>><<<>>><<<<><<<>>><<><><<><>>><<>><<<><>>>><>><<<<>><<<<><<<<>>>><<<>>><<>>>><<>>>><<<><<><<<>>>><>><>><<<>><<<><<>><<<>>>><<>>>><<<<>>>><<<<>>><<<<>>><<<>>><<<<><<<>>>><<>>>><>>><><<<>><<><<<><>>><><>>><<<<>>><<<<><<><<<>><<<<><<<<>>>><<<<>><>>>><<>>><<<<>>>><<>>>><><<>>><<><<>><>>>><><<<>>>><<>>><>>>><>><<<<>>>><<<>>>><>>><<>>>><>>>><<>>><<>>><><<<>>><<<><<<>>><<<<>>><<<><<>>>><>>>><><>>><>><><<>>>><<><>><<>><>>><<><<<>>><>><<<><<<<>><><<>><>><<>>>><<<<><<>>>><<<<><>>><<><>>>><<<><<>><<<<>>><<><<>>><<<>>><<<>>><<<<><<<>>>><<<>><>>>><<><<><<<<>>>><<<<>><<<>>>><<<>>>><<<<>>>><<>><><<<<><<<<><<<<>>>><<>><>><<<<><<<>><<>><<<>>>><>>>><<><<<><>>><<<<><>>><>>>><<<<>>>><<<<>><>><<<<>>><>><<<<>>><<<<>>><>>>><>>><<<>><<<>>><<<>>><>>><<<<>><<><<<>><<<<>>>><<><><<<<>>>><<<<>><<<>><<>>>><<<<><>>><>>>><<<><<<<>><<<>><><<<<>><<<<>>><<<>>>><>>>><>><<>><<>>>><<<<>>>><>>>><<<<>><<<>><<<<><<<<><>>>><<<>>>><<<<>><<>><<<<><>><>>>><><<<<>>>><<<<><<<>>>><<<>>>><<>>>><<<><<><>>><<<<>>><<>><<<<>>><<>>><<<>>>><>>>><<<<>>>><<<><<<<>>><<<<>>><>><><<<<>><<<>><<<>>><<<<><<<>>>><<<>>>><<>>>><<>>>><<<<>>>><>><<>>><<>><<<<><<><><<<<>>><<>>><<<<>>><<>><><<<<>>><<>><<<>>>><<<>>>><<><<<<>><<<>><<<>><><<<<><<><<<>>>><>>>><<<><<>><<<<>><<<<>>><><<<>>>><<>>><<<<>>>><<<>>><<<<>>><<<<>><<<>>><><>><<>><>>>><>>><<<>><>>><>><<>><><>><<>><>><<>><><<>>><<<<>>><<<>>><<>>>><>>><>>><>>><<><<><<<>><>><<>><>>>><>>>><<<><<>>><<>><<<><<>>><<<<>>>><<<>><<<<><<<<><<<<><<<>>>><<<>>>><<<>>><<<>>><<<<>>><>>>><<<<>>>><<<>>>><>>>><>>><<<>>>><<>>><<<>><<<<><<<<>>>><<<<>>><>><<<>><>>>><>>><<>><<<<>>><<<<>>>><><>>><>><>>>><>><>>><<<>>>><><<<>>><<>>>><<<<>>>><<<<>>>><<<<>>><<<<>>><<<<>><<<<>><>>><<>>><<<>>>><<<>>>><>>>><<>>><<<<>>>><><<<><<>>><<<><<>>>><>><<>><<<<>><<><><><><<<>>><<>><<<<>>>><>>>><<<><<<><>>><>>><<>><<<<>><<<>>>><<<><<<<>><<<<>>>><<>><>><><<>>>><<>><<<>>>><>>><<>>>><<<<><>><>>>><<<><<<>>>><>><><>><<<>>><<<<>>>><<>><<<<>>><<<>>><<<>>><<>>>><<<<>>><<<<>>><>><<<<>><>><>>>><<>>><<<<><<<<><<<<><>><<<<>>>><<<>>><<>>>><<<<>><<<<><<<>><>>><<<><<<<>><>><<<<>>><<<<>>><><<<>>><<<<>><<<<><<>>><<>>><<<>>><<<<>>><>><<><<>><<<<>>>><>><<>>>><<<><><<>><><<<<>>><<<>>>><<<<><<<<>>>><>>><>>><>><<<><<<<>>>><<<>>><<<<><<<>>>><<<<>>><<>>><<><<>><<<<>>>><<>>>><<<<>>><<<>>>><<><<<<>><>><<<><<>>>><<<<>>><<>><<<>>><<<<>><<<>><<<<>>><<>>><<<<>><>><<>>>><<<>`;
const example = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

const rocks = [
  [
    0b00011110
  ],
  [
    0b00001000,
    0b00011100,
    0b00001000,
  ],
  [
    0b00000100,
    0b00000100,
    0b00011100,
  ],
  [
    0b00010000,
    0b00010000,
    0b00010000,
    0b00010000,
  ],
  [
    0b00011000,
    0b00011000,
  ],
];

widestRockRows = [
  0,
  1,
  2,
  0,
  0
];

nibbleLookup = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

class Aoc17 {
  wind;
  windLen;
  tower = [];
  towerLen = 0;
  windIndex = 0;
  rockIndex = 0;
  completeLen = 0;
  rocksRecycled = -1;
  count = 0;

  constructor(data) {
    this.wind = data;
    this.windLen = data.length;
  }

  collision(rock, towerIndex) {
    const rockHeight = rock.length;
    for (let i = 0; i < rockHeight; i++, towerIndex++) {
      if (towerIndex >= this.towerLen) {
        return false;
      }

      const towerRow = this.tower[towerIndex];
      const rockRow = rock[(rockHeight - i) - 1]
      const nbt = this.numBits(towerRow);
      const nbr = this.numBits(rockRow);
      const nbMerged = this.numBits(towerRow | rockRow);
      if (nbMerged !== (nbt + nbr)) { // collide if less bits after merging
        return true;
      }
    }
    return false;
  }

  getNextWindDir() {
    const index = this.windIndex % this.windLen;
    if (index === 0) {
      // if (this.towerLen) {
        this.isPattern();
      // }
    }
    this.windIndex++;
    return this.wind[index];
  }

  blowRock(rock, rockId, towerIndex = null) {
    const dir = this.getNextWindDir();
    const newRock = _.cloneDeep(rock);
    const widest = newRock[widestRockRows[rockId]];
    const rockHeight = rock.length;

    if (dir === '>') {
      if ((widest & 0x01) !== 0x01) {
        for (let i = 0; i < rockHeight; i++) {
          newRock[i] >>= 1;
        }
      }
    } else {
      if ((widest & 0x40) !== 0x40) {
        for (let i = 0; i < rockHeight; i++) {
          newRock[i] <<= 1;
        }
      }
    }

    if (towerIndex === null) {
      return newRock;
    }

    if (!this.collision(newRock, towerIndex)) {
      return newRock;
    }

    return null;
  }

  numBits(b) {
    return nibbleLookup[b & 0x0F] + nibbleLookup[b >> 4];
  }

  dropRock() {
    const rockId = this.rockIndex % 5;
    if (rockId === 0) {
      this.rocksRecycled++;
    }
    this.rockIndex++;

    let rock = _.cloneDeep(rocks[rockId]);
    const rockHeight = rock.length;

    for (let i = 0; i < 4; i++) {
      rock = this.blowRock(rock, rockId);
    }

    let overlap = 0;
    let resting = false;
    while (!resting) {
      if (overlap >= this.towerLen) {
        resting = true;
        break;
      }

      // loop for overlap
      for (let i = 0; i <= overlap; i++) {
        const towerRow = this.tower[this.towerLen - 1 - (overlap - i)];
        const rockRow = rock[(rockHeight - i) - 1]
        const nbt = this.numBits(towerRow);
        const nbr = this.numBits(rockRow);
        const nbMerged = this.numBits(towerRow | rockRow);
        if (nbMerged !== (nbt + nbr)) { // collide if less bits after merging
          resting = true;
          break;
        }
      }

      if (resting) {
        break;
      }

      overlap++;

      const newRock = this.blowRock(rock, rockId, this.towerLen - overlap);
      if (newRock !== null) {
        rock = newRock;
      }
    }


    // place the rock
    for (let i = rockHeight-1; i >= 0; i--, overlap--) {
      if (overlap > 0) {
        this.tower[this.towerLen - overlap] |= rock[i];
      } else {
        this.tower[this.towerLen++] = rock[i];
      }
    }
  }

  dec2bin(dec) {
    return (dec >>> 0).toString(2);
  }

  displayTower() {
    for (let i = this.towerLen-1; i >= 0; i--) {
      console.log(`|${String(this.dec2bin(this.tower[i])).padStart(7, '0')}|`);
    }
  }

  truncateTower() {
    if (this.towerLen > 1) {
      const blockSize = 50;
      const block = this.tower.splice(0, this.towerLen - blockSize);
      this.completeLen += block.length / 2;
      this.towerLen = this.tower.length;
      fs.writeFileSync('tower.bin', Buffer.from(block).toString('hex'), { flag: 'a+' });
    }
  }

  towerClone = null;

  isPattern() {
    if (!this.towerClone) {
      this.towerClone = Buffer.from(this.tower).toString('hex');
    } else {
      const towerStr = Buffer.from(this.tower).toString('hex');
      this.diff = towerStr.slice(this.towerClone.length);
      console.log(this.diff.length / 2, this.rocksRecycled);
      this.rocksRecycled = 0;
      this.towerClone = Buffer.from(this.tower).toString('hex');
    }
  }

  solve() {
    for (let i = 0; i < 1010; i++) {
      this.dropRock();
    }

    // 1000000 / 14285
// 3028576 - (135+21) = 3,028,420 / 14,285 = 212
    fs.writeFileSync('tower.bin', Buffer.from(this.tower).toString('hex'));


    console.log(`Part 1: ${this.towerLen + this.completeLen}`);

    // this.displayTower();
  }
}

const aoc17 = new Aoc17(input);
aoc17.solve();
