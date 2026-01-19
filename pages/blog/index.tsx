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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">No blog posts found.</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="mb-8">
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-300">
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

        {/* Search Bar - Moved to Bottom */}
        <div className="mt-16 pt-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:border-gray-500 dark:focus:border-gray-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300"
          />
        </div>
      </div>
    </>
  );
}

import { generateRssFeed } from '@/lib/generate-rss';

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed();
  const posts = getBlogPosts('en');
  return {
    props: {
      posts,
    },
  };
};
