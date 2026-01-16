import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { GetStaticProps } from 'next';
import { format } from 'date-fns';

const translations = {
  en: {
    title: 'Ricardo Lopes',
    description: "I'm Ricardo, showcasing my work, background, and CV to demonstrate my Vibe Coding skills.",
    blog: 'Blog',
    allPosts: 'All posts →',
  },
  pt: {
    title: 'Ricardo Lopes',
    description: 'Sou o Ricardo, a mostrar o meu trabalho, experiência e CV para demonstrar as minhas competências em Code Vibing.',
    blog: 'Blog',
    allPosts: 'Todas as publicações →',
  },
};

interface HomeProps {
  recentPosts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    locale: string;
  }>;
}

export default function Home({ recentPosts }: HomeProps) {
  const router = useRouter();
  const { locale } = router;
  const t = translations[locale as keyof typeof translations] || translations.en;

  const localePosts = recentPosts.filter((post) => post.locale === locale).slice(0, 5);

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.description}
          </p>
        </div>

        {localePosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{t.blog}</h2>
            <div className="space-y-6">
              {localePosts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-xl font-semibold mb-2 group-hover:underline">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-gray-700">{post.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/blog" className="text-sm hover:underline">
                {t.allPosts}
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const allPosts = getBlogPosts('en').concat(getBlogPosts('pt'));
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
