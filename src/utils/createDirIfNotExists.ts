import fs from 'node:fs/promises';

export const createDirIfNotExists = async (
  url: string | URL,
): Promise<void> => {
  try {
    await fs.access(url);
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
