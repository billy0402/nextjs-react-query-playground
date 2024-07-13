import { useEffect } from 'react';

import type { NextPage } from 'next';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';

import { usePostDestroy, usePostList } from '@/queries/posts';

const HomePage: NextPage = () => {
  const toast = useToast();

  const { data: postList } = usePostList();
  const destroyPost = usePostDestroy();

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
