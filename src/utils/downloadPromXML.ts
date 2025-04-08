import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
import { URL } from 'url';

export async function downloadPromXML(
  fileUrl: string,
  savePath: string,
): Promise<string> {
  const url = new URL(fileUrl);
  const protocol = url.protocol === 'https:' ? https : http;

  const fileName = path.basename(url.pathname);
  const fullPath = path.join(savePath, fileName);

  // Убедимся, что директория существует
  await fs.promises.mkdir(savePath, { recursive: true });

  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(fullPath);

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed: ${response.statusCode}`));
          return;
        }

        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close(() => resolve(fullPath));
        });

        fileStream.on('error', (err) => {
          fs.unlink(fullPath, () => reject(err));
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}
