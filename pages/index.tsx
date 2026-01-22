import React, { useState, useEffect } from 'react';
import posthog from 'posthog-js';
import Head from 'next/head';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { getPageContent, PageContent } from '@/lib/pages';
import { GetStaticProps } from 'next';
import { format } from 'date-fns';



interface HomeProps {
  recentPosts: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
  }>;
  homeContent: PageContent | null;
}

export default function Home({ recentPosts, homeContent }: HomeProps) {
  // PostHog A/B Test for Tagline
  const [taglineVariant, setTaglineVariant] = useState('control');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.onFeatureFlags(() => {
        const variant = posthog.getFeatureFlag('tagline-experiment');
        if (variant) {
          setTaglineVariant(variant as string);
        }
      });
    }
  }, []);

  const descriptions = {
    control: homeContent?.data?.description_control || "I'm Ricardo, showcasing my work, background, and CV to demonstrate my AI skills.",
    test: null // Remove tagline
  };

  const currentDescription = taglineVariant in descriptions
    ? descriptions[taglineVariant as keyof typeof descriptions]
    : descriptions.control;

  const name = homeContent?.data?.name || "Ricardo Lopes";

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={currentDescription || descriptions.control} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-300">{name}</h1>
          {currentDescription && (
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-balance">
              {currentDescription}
            </p>
          )}
        </div>

        {recentPosts.length > 0 && (
          <section className="mb-12">
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.slug} className="mb-8">
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
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
              <Link href="/blog" className="text-sm text-gray-900 dark:text-gray-300">
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
  const allPosts = getBlogPosts();
  const homeContent = await getPageContent('home');

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
      homeContent,
    },
  };
};
