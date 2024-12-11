'use client'

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
        <li>
          <Link href="/posts/create">Create Post</Link>
        </li>
        <li>
          <Link href='/posts/delete'>Delete Post</Link>
        </li>
      </ul>
      <style jsx>{`
        nav {
          background-color: #0070f3;
          padding: 10px;
        }
        ul {
          list-style: none;
          display: flex;
          justify-content: space-around;
          padding: 0;
        }
        li {
          margin: 0 10px;
        }
        a {
          color: white;
          text-decoration: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
