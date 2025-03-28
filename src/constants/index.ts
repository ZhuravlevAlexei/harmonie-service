import path from 'node:path';

export const SERTIFICATES_DIR = path.join(process.cwd(), 'sertificates');

export const ONE_DAY = 1 * 24 * 60 * 60 * 1000; //1 day (in miliseconds)

export const HiddenGroups: number[] = [117800352, 13167485];
// 117800352 - Книги разной тематики
// 13167485 - Разное
