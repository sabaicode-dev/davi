import { QueryClient } from "react-query";

// Define a custom type for the retry function
type ShouldRetryFunction = (
  failureCount: number, 
  error: unknown
) => boolean;

// Use a more specific type for the retry function
const customRetry: ShouldRetryFunction = (
  failureCount: number, 
  error: unknown
) => {
  // Type guard to check if error is an object with status
  const isErrorWithStatus = (err: unknown): err is { status?: number } => {
    return typeof err === 'object' && err !== null && 'status' in err;
  };

  // Check if error has a status property
  if (isErrorWithStatus(error)) {
    if (error.status === 404) return false;
  }

  return failureCount < 3;
};

// Create QueryClient with proper type annotations
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global query configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: customRetry,
    },
    mutations: {
      // Global mutation configuration
      onError: (
        error: unknown, 
        variables: unknown, 
        context: unknown
      ) => {
        // Type-safe error logging
        if (error instanceof Error) {
          console.error('Mutation Error:', error.message);
        } else {
          console.error('Unknown mutation error:', error);
        }
      },
    },
  },
});