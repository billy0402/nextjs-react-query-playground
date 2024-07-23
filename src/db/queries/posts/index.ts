import prisma from '@/db';
import type { EditPost } from '@/models/post';

export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

export async function getPost(id: number) {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
}

export async function createPost(data: EditPost) {
  const { userId, ...post } = data;
  const createdPost = await prisma.post.create({
    data: { ...post, user: { connect: { id: userId } } },
  });
  return createdPost;
}

export async function updatePost(id: number, data: EditPost) {
  const { userId, ...post } = data;
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { ...post, user: { connect: { id: userId } } },
  });
  return updatedPost;
}

export async function partUpdatePost(id: number, data: Partial<EditPost>) {
  const { userId, ...post } = data;
  const updatedPost = await prisma.post.update({
    where: { id },
    data: userId ? { ...post, user: { connect: { id: userId } } } : post,
  });
  return updatedPost;
}

export async function deletePost(id: number) {
  const post = await prisma.post.delete({ where: { id } });
  return post;
}
