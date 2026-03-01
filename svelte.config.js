import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

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
      highlight: {
        highlighter: async (code, lang = 'text') => {
          if (lang === 'mermaid') {
            return `{@html \`<pre class="mermaid">${escapeSvelte(code)}</pre>\` }`;
          }
          const highlighter = await createHighlighter({
            themes: ['poimandres'],
            langs: ['javascript', 'typescript', 'svelte', 'css', 'html', 'json', 'yaml', 'markdown', 'bash', 'shell', 'go', 'protobuf', 'graphql']
          });
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
          return `{@html \`${html}\` }`;
        }
      }
    })
  ],
  kit: {
    adapter: adapter()
  }
};

export default config;
