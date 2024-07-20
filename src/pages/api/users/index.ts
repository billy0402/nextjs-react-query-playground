import type { NextApiRequest, NextApiResponse } from 'next';

import { getUsers } from '@/helpers/users';
import type { User } from '@/models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const users = await getUsers();
      res.status(200).json(users);
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
