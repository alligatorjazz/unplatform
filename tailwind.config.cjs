/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,astro,mdx}"
	],
	theme: {
		extend: {
			colors: {
				// Using modern `rgb`
				bgColor: "var(--bg-color)",
				fgColor: "var(--fg-color)",
				textColor: "var(--text-color)",
				headerColor: "var(--header-color)",
				accentColor: 'var(--accent-color) ',
			},
			fontFamily: {
				text: "var(--text-font)",
				header: "var(--header-font)"
			},
			keyframes: {
				shimmer: {
					"0%, 100%": { filter: "brightness(100%)" },
					"85%": { filter: "brightness(100%)" },
					"90%": { filter: "brightness(150%)" },
				},
				lumine: {
					"0%": { transform: "translateX(-50%)" },
					"100%": { transform: "translateX(-10%)" }
				}
			},
			animation: {
				"shimmer": "shimmer 10s ease-out infinite",
				"lumine": "lumine 16s linear infinite",
				"spin": "spin ease-in-out 1s infinite",
				"apparate": "apparate linear 3s 1"
			},
			dropShadow: {
				"colored": "8px 8px 0px var(--fg-color)"
			}
		}
	},
	plugins: [
        require('tailwind-scrollbar'),
	]
}