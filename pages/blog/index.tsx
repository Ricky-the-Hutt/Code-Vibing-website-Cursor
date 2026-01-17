import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { format } from 'date-fns';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  locale: string;
}

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <Head>
        <title>Blog - Ricardo Lopes</title>
        <meta name="description" content="Ricardo Lopes Blog" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog & News</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:border-gray-500 dark:focus:border-gray-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No blog posts found.</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-b-0"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-semibold mb-2 group-hover:underline text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getBlogPosts('en');
  return {
    props: {
      posts,
    },
  };
};
