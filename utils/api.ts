export const deletePost = async (id: string): Promise<void> => {
    const res = await fetch(`http://localhost:8000/api/posts/${id}`, {
      method: 'DELETE',
    });
  
    if (!res.ok) {
      throw new Error('Failed to delete post');
    }
  };
  