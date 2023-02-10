import fs from 'fs';
import path from 'path';

export function listFiles(dirName: string): string[] {
  const entries = fs.readdirSync(dirName, { withFileTypes: true });
  const files: string[] = [];
  const dirs: string[] = [];

  entries.forEach((e) => {
    // Get the full path to the entry.
    const p = path.join(dirName, e.name);

    // Split the entry into one of the lists: file or directory.
    if (e.isDirectory()) {
      dirs.push(p);
    } else {
      files.push(p);
    }
  });

  // Recurse into all subdirectories.
  dirs.forEach((d) => files.push(...listFiles(d)));

  return files;
}
