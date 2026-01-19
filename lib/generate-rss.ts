import fs from 'fs';
import { Feed } from 'feed';
import { getBlogPosts } from './blog';

export const generateRssFeed = async () => {
    const posts = getBlogPosts();
    const siteURL = 'https://rickylopes.pt';
    const date = new Date();
    const author = {
        name: 'Ricardo Lopes',
        email: 'email@rickylopes.pt', // Placeholder
        link: 'https://twitter.com/rickylopes', // Placeholder
    };

    const feed = new Feed({
        title: 'Ricardo Lopes Blog',
        description: "I'm Ricardo, showcasing my work, background, and CV to demonstrate my Vibe Coding skills.",
        id: siteURL,
        link: siteURL,
        image: `${siteURL}/favicon.ico`,
        favicon: `${siteURL}/favicon.ico`,
        copyright: `All rights reserved ${date.getFullYear()}, Ricardo Lopes`,
        updated: date,
        generator: 'Feed for Node.js',
        feedLinks: {
            rss2: `${siteURL}/rss.xml`,
            json: `${siteURL}/rss.json`,
            atom: `${siteURL}/atom.xml`,
        },
        author,
    });

    posts.forEach((post) => {
        const url = `${siteURL}/blog/${post.slug}`;
        feed.addItem({
            title: post.title,
            id: url,
            link: url,
            description: post.excerpt,
            content: post.excerpt,
            author: [author],
            contributor: [author],
            date: new Date(post.date),
        });
    });

    fs.writeFileSync('./public/rss.xml', feed.rss2());
};
