# AGENTS.MD - Project Guidelines and Rules

This document outlines the rules, conventions, and guidelines for working on this website project. It serves as a reference for AI agents and developers.

## Project Overview

**Website Name:** Ricardo Lopes Portfolio  
**Purpose:** Personal portfolio website showcasing work, background, and CV  
**Design Style:** Minimalist, inspired by [lalitm.com](https://lalitm.com)  
**Target Audience:** Recruiters and potential employers

## Technology Selection Policy
- **Priority to Free Options:** Every solution offered for the technologies used should give priority to free options.
- **Default Browser:** Safari


## Technology Stack

- **Framework:** Next.js 16+ (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content Management:** Markdown files for blog posts
- **Deployment:** Vercel
- **Analytics:** Google Analytics (optional)
- **Performance:** Vercel Speed Insights
- **Comments:** Giscus (optional)

## Functional Specifications

### Core Features
- [ ] Contact form
- [ ] Newsletter/email subscription
- [x] Blog/news section
- [x] Search functionality
- [ ] User authentication/login
- [ ] E-commerce/shopping cart
- [x] Social media integration
- [ ] Comments system
- [ ] Image galleries/portfolios
- [ ] Video embeds
- [ ] Live chat
- [ ] Booking/scheduling system

### Third-Party Integrations
- **Analytics:** Google Analytics
- **Email service:** Free tier provider (TBD)
- **Payment processing:** No
- **Social media:** LinkedIn
- **Maps:** Google Maps (if needed)


## Design Principles

### Visual Style
- **Minimalist aesthetic:** Clean, simple, uncluttered
- **Color scheme:** Primarily grayscale (black, white, grays)
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial)
- **Layout:** Max-width 2xl (672px) for content, centered
- **Spacing:** Generous whitespace, consistent padding/margins

### Design Rules
1. **No heavy colors:** Avoid bright colors, gradients, or heavy backgrounds
2. **Simple navigation:** Minimal header with text links only
3. **Clean typography:** Use system fonts, maintain readability
4. **Consistent spacing:** Use Tailwind spacing scale consistently
5. **Border accents:** Use subtle borders (border-gray-200) for separation
6. **Hover states:** Simple underline or subtle color changes on hover

### Layout Guidelines
- Header: Simple top navigation bar with border-bottom
- Footer: Minimal with just copyright, centered
- Content: Max-width 2xl, left-aligned text
- Blog posts: List format with title, date, excerpt
- No hero sections or large call-to-action buttons

## Code Conventions

### File Structure
```
/
├── components/          # React components
├── content/            # Markdown blog posts
│   └── blog/
├── lib/                # Utility functions
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # HTML document
│   ├── index.tsx      # Home page
│   ├── cv.tsx         # CV page
│   └── blog/          # Blog pages
├── public/             # Static assets
├── styles/             # Global styles
└── ...
```

### Component Guidelines
1. **Use TypeScript:** All components should be typed
2. **Functional components:** Use function components, not classes
3. **Props interfaces:** Define interfaces for component props
4. **No 'use client':** Pages Router doesn't need this directive
5. **Consistent naming:** PascalCase for components, camelCase for functions

### Styling Rules
1. **Tailwind only:** Use Tailwind utility classes, avoid custom CSS
2. **Responsive design:** Mobile-first approach with md: breakpoints
3. **Color classes:** Use gray-* scale, avoid primary-* colors
4. **Typography:** Use Tailwind typography plugin for blog content
5. **No inline styles:** Use className only

### Internationalization (i18n)
- **Supported languages:** English (en), Portuguese (pt)
- **Translation pattern:** Use translation objects in each component
- **Locale handling:** Use Next.js router.locale
- **Content:** Separate markdown files for each language (e.g., `post-en.md`, `post-pt.md`)

## Content Management

### Blog Posts
- **Format:** Markdown files in `content/blog/`
- **Naming:** `{slug}-{locale}.md` (e.g., `welcome-en.md`)
- **Frontmatter required:**
  ```yaml
  ---
  title: Post Title
  date: YYYY-MM-DD
  excerpt: Brief description
  locale: en
  ---
  ```
- **Processing:** Uses gray-matter and remark for parsing

### CV File
- **Location:** `public/cv.pdf`
- **Access:** Available at `/cv.pdf` and `/cv` page

## Deployment

### Vercel Configuration
- **Auto-deploy:** Enabled via GitHub integration
- **Build command:** `npm run build`
- **Environment variables:** Set in Vercel dashboard
- **Speed Insights:** Automatically enabled on Vercel

### Environment Variables
Create `.env.local` for local development:
```
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Giscus Comments (optional)
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

## Code Quality Rules

### TypeScript
- **Strict mode:** Enabled
- **Type safety:** Always type props, functions, and variables
- **Interfaces:** Define interfaces for data structures
- **No `any`:** Avoid using `any` type

### Error Handling
- **404 pages:** Custom 404 page with translations
- **Missing content:** Handle gracefully (return null, show message)
- **Date serialization:** Always convert dates to strings for getStaticProps

### Performance
- **Static generation:** Use getStaticProps/getStaticPaths where possible
- **Image optimization:** Use Next.js Image component if images are added
- **Code splitting:** Automatic with Next.js
- **Lazy loading:** Use for heavy components if needed

## System Requirements

### Browser Compatibility
- **Minimum browser versions:** Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile browsers:** iOS Safari, Chrome Mobile
- **Accessibility:** Basic compliance

### Security
- **HTTPS:** Enforced
- **Data protection:** GDPR compliance required
- **User data:** No storage of user data implemented
- **API security:** N/A (Static/Client-side)

## Testing & Quality Assurance

### Testing Requirements
- **Browser testing:** Chrome, Firefox, Safari, Edge
- **Functionality testing:** All features must be verified
- **Performance testing:** Vercel Speed Insights + Lighthouse
- **User acceptance testing:** Owner review

## Launch Checklist
- [ ] Domain connected
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] All forms tested
- [ ] All links working
- [ ] Mobile responsive verified
- [ ] SEO meta tags added
- [ ] Social media previews tested


## Git Workflow

### Commit Messages
- **Format:** Clear, descriptive messages
- **Examples:**
  - "Add Vercel Speed Insights for performance monitoring"
  - "Redesign website to match minimalist lalitm.com style"


### Branching
- **Main branch:** `main`
- **Deployment:** Auto-deploys from `main` branch

## Areas to Fill In Later

### Content
- [ ] **About section:** Add detailed about/bio content
- [ ] **CV file:** Upload actual CV PDF to `public/cv.pdf`
- [ ] **Blog posts:** Create more blog posts in both languages
- [ ] **Project descriptions:** If adding portfolio/projects section

### Configuration
- [ ] **Google Analytics:** Add GA tracking ID if needed
- [ ] **Giscus setup:** Configure comments system if desired
  - Repository: _______________
  - Repo ID: _______________
  - Category ID: _______________
- [ ] **Custom domain:** Configure if you get a custom domain
- [ ] **SEO meta tags:** Add more specific meta descriptions per page

### Features (Optional)
- [ ] **RSS feed:** Add RSS feed generation for blog
- [ ] **Newsletter:** Add newsletter signup if needed
- [ ] **Contact form:** Add contact form if needed
- [ ] **Projects section:** Add portfolio/projects showcase
- [ ] **Tags/categories:** Add tagging system for blog posts

### Social Media (If Re-added)
- [ ] **LinkedIn:** URL: https://www.linkedin.com/in/ricardogalopes/

## Common Tasks

### Adding a New Blog Post
1. Create markdown file: `content/blog/{slug}-{locale}.md`
2. Add frontmatter with title, date, excerpt, locale
3. Write content in markdown
4. Create separate file for each language
5. Push to GitHub (auto-deploys)

### Updating Content
1. Edit markdown files in `content/blog/`
2. Or edit page components in `pages/`
3. Test locally with `npm run dev`
4. Commit and push changes

### Changing Design
1. Follow minimalist principles
2. Update Tailwind classes in components
3. Maintain max-width 2xl for content
4. Keep color scheme grayscale
5. Test responsive design

## Important Notes

### What NOT to Do
- ❌ Don't add heavy animations or transitions
- ❌ Don't use bright colors or gradients
- ❌ Don't create complex navigation menus
- ❌ Don't add unnecessary JavaScript
- ❌ Don't break the minimalist aesthetic
- ❌ Don't use custom fonts (stick to system fonts)
- ❌ Don't add X (Twitter) or Instagram icons (removed per requirements)

### What TO Do
- ✅ Keep design clean and minimal
- ✅ Use system fonts
- ✅ Maintain consistent spacing
- ✅ Follow TypeScript best practices
- ✅ Write clear, descriptive commit messages
- ✅ Test locally before pushing
- ✅ Keep translations up to date for both languages

## Performance Targets

- **Page load:** < 3 seconds
- **Lighthouse score:** > 90
- **Core Web Vitals:** All green
- **Mobile responsive:** Test on multiple devices

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Design Reference:** https://lalitm.com

---

**Last Updated:** 2026-01-16  
**Maintained by:** Ricardo Lopes  
**Project Status:** Active Development
