import type { NextApiRequest, NextApiResponse } from 'next';

import {
  deletePost,
  getPost,
  partUpdatePost,
  updatePost,
} from '@/db/queries/posts';
import type { Post } from '@/models/post';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post>,
) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET': {
      const post = await getPost(Number(id));
      if (!post) {
        res.status(404).end(`Post with ID ${id} Not Found`);
        break;
      }

      res.status(200).json(post);
      break;
    }
    case 'PUT': {
      const data = req.body;
      const updatedPost = await updatePost(Number(id), data);
      if (!updatedPost) {
        res.status(404).end(`Post with ID ${id} Not Found`);
        break;
      }

      res.status(201).json(updatedPost);
      break;
    }
    case 'PATCH': {
      const data = req.body;
      const updatedPost = await partUpdatePost(Number(id), data);
      if (!updatedPost) {
        res.status(404).end(`Post with ID ${id} Not Found`);
        break;
      }

      res.status(201).json(updatedPost);
      break;
    }
    case 'DELETE': {
      const deletedPost = await deletePost(Number(id));
      if (!deletedPost) {
        res.status(404).end(`Post with ID ${id} Not Found`);
        break;
      }

      res.status(204).end();
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
