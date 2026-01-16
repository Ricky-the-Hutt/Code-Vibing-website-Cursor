import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { format } from 'date-fns';
import Comments from '@/components/Comments';

const translations = {
  en: {
    backToBlog: '← Back to Blog',
    publishedOn: 'Published on',
  },
  pt: {
    backToBlog: '← Voltar ao Blog',
    publishedOn: 'Publicado em',
  },
};

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
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

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
          className="text-gray-600 hover:underline mb-8 inline-block text-sm"
        >
          {t.backToBlog}
        </Link>

        <article>
          <h1 className="text-4xl font-bold mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            {t.publishedOn} {format(new Date(post.date), 'MMM dd, yyyy')}
          </p>

          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Comments Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold mb-6">
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { slug: string }; locale: string }[] = [];

  locales?.forEach((locale) => {
    const posts = getBlogPosts(locale);
    posts.forEach((post) => {
      paths.push({
        params: { slug: post.slug },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const post = getBlogPostBySlug(slug, locale || 'en');

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
