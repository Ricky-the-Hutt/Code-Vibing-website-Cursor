import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { format } from 'date-fns';

const translations = {
  en: {
    title: 'Blog - Ricardo Lopes',
    heading: 'Blog & News',
    search: 'Search posts...',
    noPosts: 'No blog posts found.',
    readMore: 'Read More',
  },
  pt: {
    title: 'Blog - Ricardo Lopes',
    heading: 'Blog & Notícias',
    search: 'Pesquisar publicações...',
    noPosts: 'Nenhuma publicação encontrada.',
    readMore: 'Ler Mais',
  },
};

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
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    if (post.locale !== locale) return false;
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
        <title>{t.title}</title>
        <meta name="description" content="Ricardo Lopes Blog" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">{t.heading}</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:border-gray-500 focus:outline-none"
          />
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <p className="text-gray-600 text-center py-8">{t.noPosts}</p>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-semibold mb-2 group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-gray-700">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getBlogPosts(locale || 'en');
  return {
    props: {
      posts,
    },
  };
};
