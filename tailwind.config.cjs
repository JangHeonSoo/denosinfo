/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts}'],
	theme: {
		extend: {
			colors: {
				white: '#f8f9fa',
				primary: '#3b82f6', // Mobile/tech blue
				'primary-dark': '#1d4ed8',
				secondary: '#8b5cf6', // Indigo/Purple accent
				'text-main': '#1f2937',
				'text-muted': '#6b7280',
				'bg-light': '#f3f4f6',
				'bg-white': '#ffffff'
			},
			fontFamily: {
				body: ['Inter', ...defaultTheme.fontFamily.sans],
				heading: ['Outfit', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateColumns: {
				list: 'repeat(auto-fill, minmax(350px, 1fr))'
			},
			boxShadow: {
				card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
