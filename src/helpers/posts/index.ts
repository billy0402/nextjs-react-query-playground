import { readFile, writeFile } from '@/helpers/file';
import type { EditPost, Post } from '@/models/post';

const filePath = '/src/fixtures/fake-data/posts.json';

async function readPostsFile() {
  const posts = await readFile<Post[]>(filePath);
  return posts;
}

async function writePostsFile(data: Post[]) {
  const posts = await writeFile(filePath, data);
  return posts;
}

export async function getPosts() {
  const posts = await readPostsFile();
  return posts;
}

export async function getPost(id: number) {
  const posts = await readPostsFile();
  return posts.find((post) => post.id === id);
}

export async function createPost(data: EditPost) {
  const posts = await readPostsFile();
  const id = (posts[posts.length - 1]?.id ?? 0) + 1;
  const newPost: Post = { ...data, id };
  posts.push(newPost);
  await writePostsFile(posts);
  return newPost;
}

export async function updatePost(id: number, data: EditPost) {
  const posts = await readPostsFile();
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  posts[postIndex] = { ...data, id };
  await writePostsFile(posts);
  return posts[postIndex];
}

export async function partUpdatePost(id: number, data: Partial<EditPost>) {
  const posts = await readPostsFile();
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  posts[postIndex] = { ...posts[postIndex], ...data, id };
  await writePostsFile(posts);
  return posts[postIndex];
}

export async function deletePost(id: number) {
  const posts = await readPostsFile();
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  const deletedPost = posts.splice(postIndex, 1);
  await writePostsFile(posts);
  return deletedPost[0];
}
