import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { format } from 'date-fns';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {


  return (
    <>
      <Head>
        <title>{post.title} - Ricardo Lopes</title>
        <meta name="description" content={post.title} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="text-gray-600 dark:text-gray-400 mb-8 inline-block text-sm"
        >
          ← Back to Blog
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-300">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
            Published on {format(new Date(post.date), 'MMM dd, yyyy')}
          </p>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
