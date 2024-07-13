import { useEffect } from 'react';

import type { NextPage } from 'next';

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

import type { EditPost } from '@/models/post';
import { usePostCreate, usePostRetrieve, usePostUpdate } from '@/queries/posts';
import { useUserList } from '@/queries/users';

const PostDetailPage: NextPage = () => {
  const router = useRouter();
  const toast = useToast();

  const { id } = router.query as { id: string };
  const isCreate = id === 'create';

  const { data: post } = usePostRetrieve(Number(id));
  const { data: users } = useUserList();
  const createPost = usePostCreate();
  const updatePost = usePostUpdate(Number(id));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPost>();

  const onSubmit = (data: any) => {
    if (isCreate) {
      createPost.mutate(data);
    } else {
      updatePost.mutate(data);
    }
  };

  useEffect(() => {
    if (!post || !users) return;

    reset(post);
  }, [post, reset, users]);

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
