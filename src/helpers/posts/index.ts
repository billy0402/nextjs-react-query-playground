import { posts as fakePosts } from '@/fixtures/fake-data/posts';
import type { EditPost, Post } from '@/models/post';

const posts = fakePosts;

export function getPosts() {
  return posts;
}

export function getPost(id: number) {
  return posts.find((post) => post.id === id);
}

export function createPost(data: EditPost) {
  const id = (posts[posts.length - 1]?.id ?? 0) + 1;
  const newPost: Post = { ...data, id };
  posts.push(newPost);
  return newPost;
}

export function updatePost(id: number, data: EditPost) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  posts[postIndex] = { ...data, id };
  return posts[postIndex];
}

export function partUpdatePost(id: number, data: Partial<EditPost>) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  posts[postIndex] = { ...posts[postIndex], ...data, id };
  return posts[postIndex];
}

export function deletePost(id: number) {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) return null;

  const deletedPost = posts.splice(postIndex, 1);
  return deletedPost[0];
}
