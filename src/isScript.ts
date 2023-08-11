const testInfixes = ['test', 'spec', 'e2e-test', 'e2e-spec'];

export function isScript(name: string): boolean {
  return (
    // Include js and ts files.
    (name.endsWith('.js') || name.endsWith('.ts')) &&
    // Exclude type mappings.
    !name.endsWith('.d.ts') &&
    // Exclude test-related files.
    !testInfixes.find(
      (infix) => name.endsWith(`.${infix}.ts`) || name.endsWith(`.${infix}.js`)
    )
  );
}
