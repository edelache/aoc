function Stopwatch() {
  let lapTime;
  let startTime = Date.now();

  return {
    lap: () => {
      const prevLap = lapTime || startTime;
      lapTime = Date.now();
      console.log(`Time: ${lapTime-startTime} (${lapTime - prevLap})`);
    }
  };
}

module.exports = Stopwatch;
