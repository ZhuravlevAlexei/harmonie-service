import path from 'node:path';

export const TEMP_DIR = path.join(process.cwd(), 'temp');

export const ONE_DAY = 1 * 24 * 60 * 60 * 1000; //1 day (in miliseconds)
