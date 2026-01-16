# Ricardo Lopes - Code Vibing Website

My first Code Vibing website using Cursor, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Multi-language support (English & Portuguese)
- ✅ Blog with markdown-based CMS
- ✅ Search functionality
- ✅ Social media integration (X, Instagram)
- ✅ Comments system (Giscus)
- ✅ Google Analytics integration
- ✅ Responsive design with hamburger menu
- ✅ CV download page
- ✅ Minimalist design (Black, White, Red)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

3. Update the `.env.local` file with your configuration:
   - Google Analytics ID (optional)
   - Giscus configuration (for comments)

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Add environment variables in Vercel dashboard if needed
5. Deploy!

## Project Structure

```
├── components/          # React components
│   ├── Header.tsx      # Navigation with hamburger menu
│   ├── Footer.tsx      # Footer with version and date
│   ├── Layout.tsx      # Main layout wrapper
│   └── ...
├── content/            # Content files
│   └── blog/          # Blog posts (markdown)
├── lib/               # Utility functions
│   └── blog.ts        # Blog post processing
├── pages/             # Next.js pages
│   ├── index.tsx      # Home page
│   ├── cv.tsx         # CV download page
│   └── blog/         # Blog pages
├── public/            # Static assets
│   └── cv.pdf        # CV file (add your own)
└── styles/           # Global styles
    └── globals.css    # Tailwind CSS
```

## Adding Content

### Blog Posts

1. Create a markdown file in `content/blog/`
2. Use the following frontmatter format:

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

### CV File

1. Add your CV PDF to `public/cv.pdf`
2. The CV page will automatically link to it

### Images

1. Add images to `public/` folder
2. Reference them in your content as `/image-name.jpg`

## Configuration

### Google Analytics

1. Get your GA tracking ID
2. Add it to `.env.local` as `NEXT_PUBLIC_GA_ID`

### Giscus Comments

1. Go to [giscus.app](https://giscus.app)
2. Configure your repository
3. Get the repo ID and category ID
4. Update the Giscus configuration in `pages/blog/[slug].tsx`

### Social Media Links

Update the URLs in `components/SocialMediaLinks.tsx` with your actual social media profiles.

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **gray-matter** - Markdown frontmatter parsing
- **remark** - Markdown processing
- **date-fns** - Date formatting
- **Giscus** - Comments system

## License

This project is open source and available for personal use.

---

**Ricardo knows how to Code Vibe** 🚀
