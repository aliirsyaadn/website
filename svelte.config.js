import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md', '.svx'],
      smartypants: {
        dashes: 'oldschool'
      },
      remarkPlugins: [],
      rehypePlugins: []
    })
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;
