export function createMatrix(width, height, value) {
  return Array.from({ length: width }).map(() =>
    Array.from({ length: height }).map((_) => ({ value }))
  );
}

export function setValueToMatrix(matrix, searchElement, value) {
  return matrix.map((r) =>
    r.map((c) => (c === searchElement ? { ...c, value } : c))
  );
}
