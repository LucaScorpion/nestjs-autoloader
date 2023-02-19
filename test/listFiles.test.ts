import { listFiles } from '../src/listFiles';
import path from 'path';

describe('listFiles', () => {
  it('returns a list of all files, from all subdirectories', () => {
    const root = path.join(__dirname, 'list');
    const paths = listFiles(root);
    expect(paths).toStrictEqual([
      path.join(root, 'one.txt'),
      path.join(root, 'list-sub', 'two.txt'),
      path.join(root, 'list-sub', 'list-sub-sub', 'three.txt'),
    ]);
  });

  it('excludes directories containing a module file', () => {
    const root = path.join(__dirname, 'module-with-submodule');
    const paths = listFiles(root);
    expect(paths).toStrictEqual([path.join(root, 'include.provider.ts')]);
  });
});
