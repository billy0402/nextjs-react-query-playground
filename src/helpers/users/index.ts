import { readFile } from '@/helpers/file';
import type { User } from '@/models/user';

const filePath = '/src/fixtures/fake-data/users.json';

async function readUserFile() {
  const users = await readFile<User[]>(filePath);
  return users;
}

export async function getUsers() {
  const users = await readUserFile();
  return users;
}
