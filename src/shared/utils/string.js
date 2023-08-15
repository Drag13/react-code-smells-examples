export function includesIgnoreCase(a, b) {
  return a != null && b != null && a.toLowerCase().includes(b.toLowerCase());
}
