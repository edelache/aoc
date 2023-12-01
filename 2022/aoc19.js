const input = `Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 4 ore and 8 obsidian.
Blueprint 3: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 2 ore and 16 obsidian.
Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 18 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 16 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 6: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 3 ore and 8 obsidian.
Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 15 clay. Each geode robot costs 4 ore and 17 obsidian.
Blueprint 8: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 10 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 9: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 10: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 11: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 9 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 12: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 13: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 2 ore and 11 obsidian.
Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 2 ore and 9 obsidian.
Blueprint 15: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
Blueprint 16: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 9 clay. Each geode robot costs 2 ore and 20 obsidian.
Blueprint 17: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 20 clay. Each geode robot costs 4 ore and 18 obsidian.
Blueprint 18: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 18 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 19: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 20: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 17 clay. Each geode robot costs 4 ore and 16 obsidian.
Blueprint 21: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 6 clay. Each geode robot costs 3 ore and 11 obsidian.
Blueprint 22: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 3 ore and 14 obsidian.
Blueprint 19: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 2 ore and 18 obsidian.
Blueprint 24: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 9 obsidian.
Blueprint 25: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 15 obsidian.
Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 10 clay. Each geode robot costs 2 ore and 13 obsidian.
Blueprint 27: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 6 clay. Each geode robot costs 4 ore and 11 obsidian.
Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 2 ore and 19 obsidian.
Blueprint 29: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 4 ore and 11 clay. Each geode robot costs 3 ore and 15 obsidian.
Blueprint 30: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 20 clay. Each geode robot costs 2 ore and 14 obsidian.`;

const example = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;

class Aoc19 {
  blueprints = [];

  constructor (data) {
    let rawBlueprints = data.split('\n')
    this.blueprints = rawBlueprints.map((bp, index) => {
      const p = bp.split(': ');
      let botLines = bp.split('. ');
      botLines = botLines.map(line => line.split(' costs '));
      botLines = botLines.map(botParts => botParts[1].split(' and '));
      botLines = botLines.map(botParts => botParts.reduce((acc, costStr) => {
        const clean = costStr.replace(/\./g, '');
        const [num, material] = clean.split(' ');
        acc[material] = parseInt(num);
        return acc;
      }, { ore: 0, clay: 0, obsidian: 0 }));

      return {
        id: index+1,
        oreBot: botLines[0],
        clayBot: botLines[1],
        obsidianBot: botLines[2],
        geodeBot: botLines[3]
      }
    })
  }

  maxGeodes(bp, s={ oreBots: 1, clayBots: 0, obsidianBots: 0, geodeBots: 0, ore: 0, clay: 0, obsidian: 0, geodes: 0 }, minute=0) {
    for (let i = minute; i < 25; i++) {
      const newBots = {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0
      }

      if (s.obsidian >= bp.geodeBot.obsidian && s.ore >= bp.geodeBot.ore) {
        s.obsidian -= bp.geodeBot.obsidian;
        s.ore -= bp.geodeBot.ore;
        newBots.geode++;
      }

      if (s.clay >= bp.obsidianBot.clay && s.ore >= bp.obsidianBot.ore) {
        s.obsidian -= bp.obsidianBot.obsidian;
        s.ore -= bp.obsidianBot.ore;
        newBots.obsidian++;
      }

      if (s.ore >= bp.clayBot.ore) {
        s.ore -= bp.clayBot.ore;
        newBots.clay++;
      }

      if (s.ore >= bp.oreBot.ore) {
        s.ore -= bp.oreBot.ore;
        newBots.ore++;
      }

      s.ore += s.oreBots;
      s.clay += s.clayBots;
      s.obsidian += s.obsidianBots;
      s.geodes += s.geodeBots;

      s.oreBots += newBots.ore;6
      s.clayBots += newBots.clay;
      s.obsidianBots += newBots.obsidian;
      s.geodeBots += newBots.geode;

    }

    return s.geodes;
  }

  solvePart1() {
    console.log(this.blueprints)
    const geodes = this.maxGeodes(this.blueprints[0]);
    console.log(geodes);

  }

  solvePart2() {

  }
}

const aoc19 = new Aoc19(example);
aoc19.solvePart1();
