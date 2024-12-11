'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/utils/api'; // Adjust this import path as needed

interface Post {
  id: string;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('http://localhost:8000/api/posts/');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
};

const PostsPage = () => {
  const queryClient = useQueryClient();
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Ensure the mutation hook is set up correctly
//   const { mutate: handleDeletePost } = useMutation<void, Error, string>(deletePost, {
//     onSuccess: () => {
//         console.log('Request sent successfully!');
//         queryClient.invalidateQueries({ queryKey: ['posts'] });
//     },
// });

const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // Refetch data to keep UI updated
      queryClient.invalidateQueries('posts'); // Replace 'items' with your query key
      alert('Item deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting item:', error);
      alert(error.message || 'An error occurred while deleting the item.');
    },
  });

  const handleDelete = (id: string) => {
    console.log("id: ", id)
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <h3>
        <Link href="/posts/create">Create Post</Link>
      </h3>
      <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
        {posts?.map((post: Post) => (
          <li key={post.id}>
            <h3>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsPage;
