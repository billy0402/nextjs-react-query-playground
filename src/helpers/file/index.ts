import { promises as fs } from 'fs';

export async function readFile<T>(path: string): Promise<T> {
  const file = await fs.readFile(process.cwd() + path, 'utf8');
  const data = JSON.parse(file);
  return data;
}

export async function writeFile(path: string, data: any): Promise<void> {
  const dataString = JSON.stringify(data, null, 2);
  await fs.writeFile(process.cwd() + path, dataString);
}
