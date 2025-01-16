import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap'
import { remarkReadingTime } from './src/utils/readTime.ts'
import { siteConfig } from './src/data/site.config'

// https://astro.build/config
export default defineConfig({
	integrations: [mdx({
		syntaxHighlight: 'shiki',
		shikiConfig: {
			experimentalThemes: {
				light: 'vitesse-light',
				dark: 'material-theme-palenight',
			},
			wrap: true
		},
		drafts: true
	}), icon(), tailwind(), sitemap(),],
	site: siteConfig.site,
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
});
