import type { NextApiRequest, NextApiResponse } from 'next';

import { createPost, getPosts } from '@/helpers/posts';
import type { Post } from '@/models/post';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>,
) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const posts = await getPosts();
      res.status(200).json(posts);
      break;
    }
    case 'POST': {
      const data = req.body;
      const newPost = await createPost(data);
      res.status(201).json(newPost);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
