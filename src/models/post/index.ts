export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type EditPost = Omit<Post, 'id'>;
