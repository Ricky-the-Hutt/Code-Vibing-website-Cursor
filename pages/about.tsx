import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPageContent, PageContent } from '@/lib/pages';
import Layout from '@/components/Layout';

interface AboutPageProps {
    page: PageContent;
}

export default function AboutPage({ page }: AboutPageProps) {
    if (!page) return null;

    return (
        <>
            <Head>
                <title>{page.title} | Ricardo Lopes</title>
                <meta name="description" content={`Learn more about ${page.title}`} />
            </Head>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <article
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: page.body }}
                />
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const page = await getPageContent('about');

    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page,
        },
        // Revalidate every hour if running in production with Incremental Static Regeneration
        revalidate: 3600,
    };
};
