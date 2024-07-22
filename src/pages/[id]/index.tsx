import { useEffect } from 'react';

import type { GetServerSideProps, NextPage } from 'next';

import { useRouter } from 'next/router';

import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { getPost } from '@/helpers/posts';
import { getUsers } from '@/helpers/users';
import type { EditPost, Post } from '@/models/post';
import type { User } from '@/models/user';
import { usePostCreate, usePostUpdate } from '@/queries/posts';

type Props = {
  post: Post | null;
  users: User[];
};

const PostDetailPage: NextPage<Props> = ({ post, users }) => {
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query as { id: string };
  const isCreate = id === 'create';

  const createPost = usePostCreate();
  const updatePost = usePostUpdate(Number(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPost>({ defaultValues: post ?? undefined });

  const onSubmit = (data: any) => {
    if (isCreate) {
      createPost.mutate(data);
    } else {
      updatePost.mutate(data);
    }
  };

  useEffect(() => {
    if (!createPost.isSuccess) return;

    toast({
      status: 'success',
      title: 'Success!',
      description: 'Post created successfully',
    });
  }, [createPost.isSuccess, toast]);

  useEffect(() => {
    if (!updatePost.isSuccess) return;

    toast({
      status: 'success',
      title: 'Success!',
      description: 'Post updated successfully',
    });
  }, [updatePost.isSuccess, toast]);

  return (
    <Box py={5} mx={{ base: '10%', lg: '20%' }}>
      <Link href='/' _hover={{ textDecoration: 'none' }}>
        <Button mb={10}>Back</Button>
      </Link>

      <Heading as='h1' size='lg' mb={7}>
        Post Form
      </Heading>
      <VStack
        as='form'
        alignItems='flex-start'
        gap={5}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input
            {...register('title', {
              required: 'This is required',
            })}
            type='text'
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.body}>
          <FormLabel>Body</FormLabel>
          <Textarea
            {...register('body', {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.userId}>
          <FormLabel>User</FormLabel>
          <Select
            {...register('userId', {
              required: 'This is required',
              valueAsNumber: true,
            })}
            placeholder='Select option'
          >
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.userId && errors.userId.message}
          </FormErrorMessage>
        </FormControl>
        <Button type='submit' colorScheme='blue' mt={5}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default PostDetailPage;

export const getServerSideProps = (async ({ query }) => {
  const { id } = query as { id: string };
  const post = id !== 'create' ? ((await getPost(Number(id))) ?? null) : null;
  const users = await getUsers();
  return { props: { post, users } };
}) satisfies GetServerSideProps<Props>;
