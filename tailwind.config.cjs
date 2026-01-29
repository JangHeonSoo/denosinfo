/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts}'],
	theme: {
		extend: {
			colors: {
				white: '#ffffff',
				// Scandinavian Neutral Palette
				primary: '#64748b', // Slate 500 - Sophisticated Muted Blue/Gray
				'primary-dark': '#475569',
				secondary: '#94a3b8', // Slate 400
				accent: '#e2e8f0', // Slate 200 - Very light gray for backgrounds
				'text-main': '#334155', // Slate 700 - Softer than pure black
				'text-muted': '#94a3b8', // Slate 400
				'bg-light': '#f8fafc', // Slate 50 - Very subtle cool white
				'bg-white': '#ffffff',
				'bg-dark': '#0f172a', // Keep for dark mode support, but UI will lean light
			},
			fontFamily: {
				body: ['Inter', ...defaultTheme.fontFamily.sans],
				heading: ['Manrope', ...defaultTheme.fontFamily.sans], // Clean, modern, geometric
				serif: ['Merriweather', ...defaultTheme.fontFamily.serif], // For editorial accents
			},
			gridTemplateColumns: {
				list: 'repeat(auto-fill, minmax(350px, 1fr))'
			},
			boxShadow: {
				card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
