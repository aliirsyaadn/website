import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-vercel';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

let highlighterPromise = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['poimandres'],
      langs: ['javascript', 'typescript', 'svelte', 'css', 'html', 'json', 'yaml', 'markdown', 'bash', 'shell', 'go', 'protobuf', 'graphql']
    });
  }
  return highlighterPromise;
}

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
          const highlighter = await getHighlighter();
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
