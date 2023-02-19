export function isScript(name: string): boolean {
  return (
    // Include js and ts files.
    (name.endsWith('.js') || name.endsWith('.ts')) &&
    // Exclude type mappings.
    !name.endsWith('.d.ts') &&
    // Exclude test-related files.
    !name.endsWith('.test.ts') &&
    !name.endsWith('.spec.ts') &&
    !name.endsWith('.test.js') &&
    !name.endsWith('.spec.js')
  );
}
