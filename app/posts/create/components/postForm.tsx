'use client'

import React, {FormEvent, useState} from 'react';
import {router} from "next/client";

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmit = async (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content) {
            setMessage('Please fill out both the title and content');
            return;
        }

        const newPost = {title, content};

        try {
            const res = await fetch('http://localhost:8000/api/posts/', {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.detail || 'Failed to create post');
            }

            setMessage('Post created successfully!');
            setTitle('');
            setContent('');

        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="Title"/>
                </div>
                <div>
                    <label>Content</label>
                    <input value={content}
                           onChange={(e) => setContent(e.target.value)}
                           placeholder="Content"/>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PostForm;