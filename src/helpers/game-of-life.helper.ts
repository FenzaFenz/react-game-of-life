export const createField = (n: number): boolean[][] =>
    new Array(n).fill(false).map(() => new Array(n).fill(false));

export const createRandomizedField = (n: number, probability: number = 50): boolean[][] =>
    new Array(n).fill(false).map(() => Array.from({length: n}, () => Math.random() < (probability / 100)));

export const copyField = (field: boolean[][]) => field.map((row) => row.slice());