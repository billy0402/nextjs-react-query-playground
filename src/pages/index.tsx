import { useEffect } from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';

import { getPosts } from '@/helpers/posts';
import type { Post } from '@/models/post';
import { usePostDestroy } from '@/queries/posts';

type Props = {
  posts: Post[];
};

const HomePage: NextPage<Props> = ({ posts: postList }) => {
  const router = useRouter();
  const toast = useToast();

  const destroyPost = usePostDestroy(() => router.replace(router.asPath));

  useEffect(() => {
    if (!destroyPost.isSuccess) return;

    toast({
      status: 'success',
      title: 'Success!',
      description: 'Post deleted successfully',
    });
  }, [destroyPost.isSuccess, toast]);

  return (
    <Box py={5} mx={{ base: '10%', lg: '20%' }}>
      <Link href='/create' _hover={{ textDecoration: 'none' }}>
        <Button colorScheme='green' display='block' ml='auto' mb={10}>
          Create Post
        </Button>
      </Link>
      <Heading as='h1' size='lg' mb={7}>
        Post List
      </Heading>
      <List>
        {postList?.map((post, index) => (
          <ListItem key={post.id} display='flex' alignItems='center' mb={3}>
            <Button
              size='sm'
              bg='transparent'
              mr={3}
              p={0}
              onClick={() => destroyPost.mutate(post.id)}
            >
              x
            </Button>
            <Link href={`/${post.id}`}>
              {index + 1}. {post.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default HomePage;

export const getServerSideProps = (async () => {
  const posts = await getPosts();
  return { props: { posts } };
}) satisfies GetServerSideProps<Props>;
