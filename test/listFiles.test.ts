import { listFiles } from '../src/listFiles';
import path from 'path';

describe('listFiles', () => {
  it('returns a list of all files, from all subdirectories', () => {
    const paths = listFiles(path.join(__dirname, 'list'));
    expect(paths).toStrictEqual([
      path.join(__dirname, 'list', 'one.txt'),
      path.join(__dirname, 'list', 'list-sub', 'two.txt'),
      path.join(__dirname, 'list', 'list-sub', 'list-sub-sub', 'three.txt'),
    ]);
  });
});
