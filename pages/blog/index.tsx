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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-primary-black">
            {t.heading}
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:border-primary-red focus:outline-none"
            />
          </div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <p className="text-gray-600 text-center py-8">{t.noPosts}</p>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="border-b border-gray-200 pb-8 last:border-b-0"
                >
                  <h2 className="text-2xl font-bold mb-2 text-primary-black hover:text-primary-red">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-500 mb-4">
                    {format(new Date(post.date), 'MMMM dd, yyyy')}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-primary-red hover:underline"
                  >
                    {t.readMore} →
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
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
