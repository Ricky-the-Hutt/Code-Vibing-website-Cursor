import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { GetStaticProps } from 'next';
import { format } from 'date-fns';

interface HomeProps {
  recentPosts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
  }>;
}

export default function Home({ recentPosts }: HomeProps) {
  return (
    <>
      <Head>
        <title>Ricardo Lopes</title>
        <meta name="description" content="I'm Ricardo, showcasing my work, background, and CV to demonstrate my Vibe Coding skills." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-300">Ricardo Lopes</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm Ricardo, showcasing my work, background, and CV to demonstrate my Vibe Coding skills.
          </p>
        </div>

        {recentPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-300">Blog</h2>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-xl font-semibold mb-2 group-hover:underline text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-gray-700 dark:text-gray-400">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/blog" className="text-sm hover:underline text-gray-900 dark:text-gray-300">
                All posts →
              </Link>
            </div>
          </section>
        )}

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getBlogPosts('en');
  const recentPosts = allPosts
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    })
    .slice(0, 10);

  return {
    props: {
      recentPosts,
    },
  };
};
