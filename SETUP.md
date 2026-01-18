# Setup Guide

## Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Countly Analytics (optional)
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   
   # Giscus Comments (optional - get from https://giscus.app)
   NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
   NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
   NEXT_PUBLIC_GISCUS_CATEGORY=General
   NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
   
   # Version and Deploy Date (auto-set by Vercel)
   NEXT_PUBLIC_VERSION=1.0.0
   NEXT_PUBLIC_DEPLOY_DATE=
   ```

3. **Add Your CV**
   - Place your CV PDF file in the `public/` folder
   - Name it `cv.pdf`
   - The CV page will automatically link to it

4. **Update Social Media Links**
   - Edit `components/SocialMediaLinks.tsx`
   - Update the URLs with your actual social media profiles

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Adding Blog Posts

1. Create a markdown file in `content/blog/`
2. Use this format:
   ```markdown
   ---
   title: Your Post Title
   date: 2024-01-16
   excerpt: A brief description
   locale: en
   ---
   
   Your content here...
   ```
3. Create separate files for each language (e.g., `post-en.md` and `post-pt.md`)

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will auto-detect Next.js
4. Add environment variables in the Vercel dashboard
5. Deploy!

The site will be live at `your-project.vercel.app`
