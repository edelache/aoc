function LeastCommonMultiple(range) {
  function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }

  var multiple = 1;
  range.forEach(function(n) {
    multiple = lcm(multiple, n);
  });

  return multiple;
}

function CardinalDistance(p1, p2) {
  return Math.abs(p2.y - p1.y) + Math.abs(p2.x - p1.x);
}

export { LeastCommonMultiple, CardinalDistance };
