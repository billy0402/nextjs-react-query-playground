import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

function handleGlobalError(error: Error) {
  toast({
    status: 'error',
    title: 'Oops! Something went wrong!',
    description: error.message,
  });
}

export function handleError(error: Error) {
  handleGlobalError(error);
}
