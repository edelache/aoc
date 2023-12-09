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

export { LeastCommonMultiple };
