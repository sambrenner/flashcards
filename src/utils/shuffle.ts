export function shuffle(array: Array<any>, seed: number) {
  const newArray = [...array];

  let m = newArray.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--); // <-- MODIFIED LINE

    t = newArray[m];
    newArray[m] = newArray[i];
    newArray[i] = t;
    ++seed;
  }

  return newArray;
}

export function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
