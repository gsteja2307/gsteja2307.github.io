import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [icon(), tailwind(), mdx()],
	site: 'https://gsuryateja.com',
});
