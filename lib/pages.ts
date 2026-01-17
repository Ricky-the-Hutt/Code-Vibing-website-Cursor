import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const pagesDirectory = path.join(process.cwd(), 'content/pages');

export interface PageContent {
    title: string;
    body: string;
}

export async function getPageContent(name: string): Promise<PageContent | null> {
    const fullPath = path.join(pagesDirectory, `${name}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        title: data.title || '',
        body: contentHtml,
    };
}
