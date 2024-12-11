'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Params {
  params: {
    id: Promise<{id: string}>;
  };
}

const fetchPost = async (id: string): Promise<Post> => {
  const res = await fetch(`http://localhost:8000/api/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
};

const PostPage = ({ params }: Params) => {
  // Directly use params.id without awaiting
  const { id } = React.use(params);

  const { data: post, error, isLoading } = useQuery<Post>({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h3>{post?.title}</h3>
      <p>{post?.body}</p>
    </div>
  );
};

export default PostPage;