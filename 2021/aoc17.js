const input = `target area: x=241..273, y=-97..-63`;
const testInput = `target area: x=20..30, y=-10..-5`;

let [[xT1, xT2], [yT1, yT2]] = input.split(': ')[1]
  .split(', ')
  .map(val => val.split('=')[1])
  .map(val => val.split('..')
    .map(val => parseInt(val, 10))
  )
  // .map(val => parseInt(val, 10));

const grid = [];

if (xT1 > xT2) {
  let tmp = xT2;
  xT2 = xT1;
  xT1 = tmp;
}
if (yT1 > yT2) {
  let tmp = yT2;
  yT2 = yT1;
  yT1 = tmp;
}

const findX = () => {
  let x = 0;
  while (true) {
    x++;

    let i = 0;
    let cX = 0;
    let pX = 0;

    pX = x;
    while (x < xT2) {
      cX += pX;
      pX--;
      i++;

      if (cX > xT1 && cX < xT2) {
        return i;
      }

      if (pX < 0) {
        break;
      }

    }
  }
}

const attempt = (sX, sY) => {
  let pX = 0;
  let pY = 0;
  let vX = sX;
  let vY = sY;
  let maxHeight = -999999;

  function onTarget() {
    if (pX <= xT2 && pX >= xT1 && pY <= yT2 && pY >= yT1) {
      return true;
    }
    return false;
  }

  function physicsCycle() {
    pX += vX;
    pY += vY;

    if (pY > maxHeight) {
      maxHeight = pY;
    }

    if (vX < 0) {
      vX++;
    } else if (vX > 0) {
      vX--;
    }
    vY--;
  }

  while (pX < xT2 && pY > yT2) {
    physicsCycle();

    if (onTarget()) {
      return maxHeight;
    }
  }
  return null;
}


// console.log(attempt(20, -5))

// console.log(attempt(6,3));

let x = findX();

let y = -100;
let maxHeight = -999999;
let h;

for (x = x-5; x < 500; x++) {
  do {
    h = attempt(x, y);
    if (h !== null && h > maxHeight) {
      console.log('woot', h)
      maxHeight = h;
    }
    y++;
  } while (h === null && y < 10000);

  console.log('haha', maxHeight)
  do {
    h = attempt(x, y);
    if (h !== null && h > maxHeight) {
      console.log('woot2')
      maxHeight = h;
    }
    // console.log(y, h)
    y++;
  } while (h !== null && y < 10000);
}

console.log(maxHeight)
