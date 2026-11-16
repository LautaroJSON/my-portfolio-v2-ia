import { existsSync } from 'node:fs';
import path from 'node:path';

// Checks whether a root-relative path (e.g. "/projects/randomplay.png") exists
// in `/public`. Project pages are statically generated, so this runs at build
// time: an `image` declared in content but not yet added to `/public` is
// treated as missing instead of rendering a broken <img>.
export const publicAssetExists = (assetPath: string): boolean => {
  const relativePath = assetPath.replace(/^\/+/, '');
  return existsSync(path.join(process.cwd(), 'public', relativePath));
};
