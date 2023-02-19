export function combine<T>(left: T[] | undefined, right: T[]): T[] {
  return [...(left || []), ...right];
}
