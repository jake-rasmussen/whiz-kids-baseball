// Fisher–Yates shuffle
export function shuffle(array: unknown[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Return a subset (#count) of elements of array
export function getSome(array: unknown[], count: number) {
  shuffle(array);
  return array.slice(0, count);
}

// The maximum is exclusive and the minimum is inclusive
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Simulate rolling a loaded die
// (it is more likly to roll a smaller number!)
export function loadedDie() {
  const r = Math.random();

  // integer in the range 1 to 6 with desired probabilities
  if (r < 2.0 / 64.0) {
    return 6;
  } else if (r < 4.0 / 64.0) {
    return 5;
  } else if (r < 8.0 / 64.0) {
    return 4;
  } else if (r < 16.0 / 64.0) {
    return 3;
  } else if (r < 32.0 / 64.0) {
    return 2;
  } else {
    return 1;
  }
}

// Select an item at random from the array "items"
export function selectItemAtRandom(items: unknown[]) {
  return items[getRandomInt(0, items.length)];
}
