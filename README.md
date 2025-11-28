# Jeet.Rocks - Personal Portfolio Website

A modern personal website built with Next.js, showcasing projects, achievements, experiences, and blog posts.

## Features

- **Home Page** (`/`) - Hero section with overview and quick links
- **Projects Page** (`/projects`) - Display projects, hackathons, and professional experiences
- **Blog Page** (`/blog`) - Blog posts and documentation
- **Contact Page** (`/contact`) - Contact form and social links

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **Responsive Design** - Works on all devices

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── page.tsx          # Home page
│   ├── projects/
│   │   └── page.tsx      # Projects page
│   ├── blog/
│   │   └── page.tsx      # Blog page
│   ├── contact/
│   │   └── page.tsx      # Contact page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   └── Navigation.tsx    # Navigation component
└── package.json
```

## Customization

- Update personal information in the respective page components
- Add your projects in `app/projects/page.tsx`
- Add blog posts in `app/blog/page.tsx`
- Update contact information in `app/contact/page.tsx`
- Customize colors and styling in `tailwind.config.ts` and `app/globals.css`

## Deployment

The site can be deployed to Vercel, Netlify, or any platform that supports Next.js.

## License

MIT

