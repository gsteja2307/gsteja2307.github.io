const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				black: '#000',
				white: '#f8f9fa',
				orange: '#E06330',
				zinc: require('tailwindcss/colors').zinc,
			},
			fontFamily: {
				body: ['Manrope', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateColumns: {
				list: 'repeat(auto-fill, minmax(400px, max-content))'
			},
			screens: {
				xs: '480px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
			// colors: {
			// 	black: '#000',
			// 	white: '#f8f9fa',
			// 	orange: '#E06330',
			// },
			fontFamily: {
				// Headings
				sans: ['Inter', 'sans-serif'],
				// Base text
				monospace: ['Inconsolata', 'monospace'],
			},
			fontSize: {
				xs: '.75rem',
				sm: '.875rem',
				tiny: '.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
			},
			letterSpacing: {
				wide: '.025em',
			},
		},
		// screens: {
		// 	xs: '480px',
		// 	sm: '640px',
		// 	md: '768px',
		// 	lg: '1024px',
		// 	xl: '1280px',
		// },
		// // colors: {
		// // 	black: '#000',
		// // 	white: '#f8f9fa',
		// // 	orange: '#E06330',
		// // },
		// fontFamily: {
		// 	// Headings
		// 	sans: ['Inter', 'sans-serif'],
		// 	// Base text
		// 	monospace: ['Inconsolata', 'monospace'],
		// },
		// fontSize: {
		// 	xs: '.75rem',
		// 	sm: '.875rem',
		// 	tiny: '.875rem',
		// 	base: '1rem',
		// 	lg: '1.125rem',
		// 	xl: '1.25rem',
		// 	'2xl': '1.5rem',
		// 	'3xl': '1.875rem',
		// 	'4xl': '2.25rem',
		// 	'5xl': '3rem',
		// },
		// letterSpacing: {
		// 	wide: '.025em',
		// },
		// gridTemplateColumns: {
		// 	list: 'repeat(auto-fill, minmax(400px, max-content))'
		// }
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				h2: {
					letterSpacing: theme('letterSpacing.wide'),
					fontWeight: 'bold',
				},
				li: {
					letterSpacing: theme('letterSpacing.wide'),
				},
			});
		}),
		require('@tailwindcss/typography')
	],
};
