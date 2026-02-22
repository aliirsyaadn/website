# Project Overview

This is a modern personal portfolio and profile website built with **SvelteKit 5**, **Vite**, and **Tailwind CSS**. It serves as a centralized hub for showcasing professional experience, projects, blog posts, and interactive utility tools.

## Key Technologies

- **Framework:** SvelteKit 5 (latest version, using runes and other recent features)
- **Styling:** Tailwind CSS with PostCSS
- **Content Management:** 
  - **Blog:** Markdown files processed via `mdsvex`.
  - **Data-Driven Sections:** JSON files for projects, experiences, and tools.
- **Build Tool:** Vite
- **Deployment:** Optimized for Vercel using `@sveltejs/adapter-vercel`.

## Project Structure

- `src/routes/`: SvelteKit routes for `about`, `blog`, `projects`, and several utility `tools` (e.g., JWT parser, JSON lint).
- `src/components/`: Reusable Svelte components, including a dedicated `tools/` directory for tool-specific UI elements.
- `src/content/blog/`: Markdown files for blog posts.
- `src/data/`: JSON files containing static data for the site's content (projects, experiences, tools list).
- `src/lib/`: Shared utilities, including `blog.js` for post-fetching logic and theme management.

## Building and Running

The project follows standard SvelteKit/Vite commands:

- **Development:** `npm run dev` starts the Vite development server.
- **Build:** `npm run build` compiles the application for production deployment.
- **Preview:** `npm run preview` runs the production build locally for verification.

## Development Conventions

- **State Management:** Leverage Svelte 5's runes (`$state`, `$derived`, etc.) for reactive state where applicable.
- **Styling:** Strictly follow Tailwind CSS conventions. Check `tailwind.config.js` for custom configurations.
- **Content Updates:**
  - Add new blog posts by creating `.md` files in `src/content/blog/`. Ensure they include the required frontmatter (title, date, description).
  - Update projects, experiences, or tool listings by modifying the corresponding `.json` files in `src/data/`.
- **New Tools:** When adding a new utility tool, follow the pattern established in `src/routes/tools/`, utilizing the components in `src/components/tools/` for a consistent UI.
- **Dynamic Imports:** The blog system uses `import.meta.glob` to dynamically load and sort posts at build/runtime.
