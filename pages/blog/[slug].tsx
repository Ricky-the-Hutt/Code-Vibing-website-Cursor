import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { format } from 'date-fns';
import Comments from '@/components/Comments';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
  locale: string;
}

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  // Giscus configuration - Get these from https://giscus.app
  const giscusConfig = {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'your-username/your-repo',
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'your-repo-id',
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'your-category-id',
  };

  return (
    <>
      <Head>
        <title>{post.title} - Ricardo Lopes</title>
        <meta name="description" content={post.title} />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="text-gray-600 dark:text-gray-400 hover:underline mb-8 inline-block text-sm"
        >
          ← Back to Blog
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8">
            Published on {format(new Date(post.date), 'MMM dd, yyyy')}
          </p>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Comments Section */}
          <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Comments
            </h2>
            <Comments
              repo={giscusConfig.repo}
              repoId={giscusConfig.repoId}
              category={giscusConfig.category}
              categoryId={giscusConfig.categoryId}
            />
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts('en');
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
  const post = getBlogPostBySlug(slug, 'en');

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
