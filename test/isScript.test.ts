import { isScript } from '../src/isScript';

describe('isScript', () => {
  it.each`
    extension             | result
    ${'file.js'}          | ${true}
    ${'file.ts'}          | ${true}
    ${'file.service.ts'}  | ${true}
    ${'file.service.js'}  | ${true}
    ${'file.d.ts'}        | ${false}
    ${'file.test.ts'}     | ${false}
    ${'file.test.js'}     | ${false}
    ${'file.spec.ts'}     | ${false}
    ${'file.spec.js'}     | ${false}
    ${'file.e2e-test.ts'} | ${false}
    ${'file.e2e-test.js'} | ${false}
    ${'file.e2e-spec.ts'} | ${false}
    ${'file.e2e-spec.js'} | ${false}
  `(
    'returns $result when given $extension',
    ({ extension, result }: { extension: string; result: boolean }) => {
      expect(isScript(extension)).toBe(result);
    },
  );
});
