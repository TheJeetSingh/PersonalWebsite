# Personal Website

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/TheJeetSingh/PersonalWebsite)

This is the source code for my personal portfolio website, jeet.rocks. It is built with Next.js 14 and features a dynamic, comic-book-inspired design. The site includes a projects showcase, a full-featured blog with an admin control panel, and integration with the Spotify API.

## Features

*   **Comic-Inspired UI**: A unique, hand-drawn aesthetic achieved with custom CSS, a starry background, and bespoke components.
*   **Projects Showcase**: Detailed project cards with visuals, descriptions, tech stacks, and links, presented in a comic-like layout.
*   **Full-Fledged Blog**:
    *   Powered by Vercel KV for persistent data storage.
    *   A secure admin dashboard at `/admin` for creating, editing, and deleting blog posts.
    *   **Rich Text Editor**: Built with TipTap, supporting custom fonts, colors, styling, image uploads (Base64), and iframe embeds (e.g., Spotify, YouTube).
    *   **Admin Tools**: Includes live preview, autosave functionality, attachment uploads, and publish/draft toggles.
*   **Spotify Integration**: A "Now Playing" widget on the homepage displays the track I'm currently listening to on Spotify, updated in real-time.
*   **Responsive Design**: Fully responsive layout built with Tailwind CSS.
*   **Engaging Animations**: Custom animations using Framer Motion and CSS for an interactive user experience.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Database**: [Vercel KV](https://vercel.com/storage/kv)
*   **Blog Editor**: [TipTap](https://tiptap.dev/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A Vercel account with Vercel KV configured.
*   A Spotify Developer account for API credentials.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/TheJeetSingh/PersonalWebsite.git
    cd PersonalWebsite
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables.

```env
# Admin Authentication
ADMIN_PASSWORD="your_secret_admin_password"
ADMIN_COOKIE_TOKEN="a_long_random_secure_string_for_the_cookie"

# Spotify API
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"

# Vercel KV (automatically populated when linked via Vercel CLI)
KV_URL="..."
KV_REST_API_URL="..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

**Notes:**

*   **Admin Auth**: `ADMIN_PASSWORD` is used to log in to the `/admin` dashboard. `ADMIN_COOKIE_TOKEN` is a secret key for the session cookie.
*   **Spotify**: You need to create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) to get your `CLIENT_ID` and `CLIENT_SECRET`. The `REFRESH_TOKEN` can be obtained through an OAuth flow.
*   **Vercel KV**: Link your project to a Vercel project with a KV database using the Vercel CLI (`vercel link` and `vercel env pull`).

### Running the Development Server

Once the environment variables are set up, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site. The admin panel is available at [http://localhost:3000/admin](http://localhost:3000/admin).

## Project Structure

The project uses the Next.js App Router. Key directories include:

```
├── app/
│   ├── page.tsx            # Home page
│   ├── projects/           # Projects page and project-specific galleries
│   ├── blog/               # Blog index and individual post pages
│   ├── contact/            # Contact page
│   ├── admin/              # Admin dashboard, login, and helpers
│   ├── api/
│   │   ├── admin/          # API routes for blog post management
│   │   └── spotify/        # API route for Spotify integration
│   └── layout.tsx          # Root layout with fonts and navigation
├── components/
│   ├── RichTextEditor.tsx  # The TipTap editor and its toolbar
│   ├── ProjectCard.tsx     # Component for displaying projects
│   ├── SpotifyNowPlaying.tsx # Spotify widget
│   └── StarryBackground.tsx  # Animated background component
└── lib/
    └── blog.ts             # Functions for interacting with Vercel KV (blog posts)
```

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel and ensure all environment variables are configured in the project settings.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.