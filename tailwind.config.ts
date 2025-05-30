import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/ui/**/*.{js,ts,jsx,tsx,mdx}", // Added UI directory
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				sans: ["var(--font-roboto)", "sans-serif"],
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.gray.800"),
						maxWidth: "100%",
						code: {
							color: theme("colors.blue.600"),
							backgroundColor: theme("colors.gray.100"),
							borderRadius: theme("borderRadius.md"),
							padding: `${theme("spacing.1")} ${theme("spacing[1.5]")}`,
						},
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						pre: {
							color: theme("colors.gray.200"),
							backgroundColor: theme("colors.gray.800"),
						},
					},
				},
				dark: {
					css: {
						color: theme("colors.gray.200"),
						code: {
							color: theme("colors.blue.400"),
							backgroundColor: theme("colors.gray.800"),
						},
						pre: {
							color: theme("colors.gray.200"),
							backgroundColor: theme("colors.gray.900"),
						},
						a: {
							color: theme("colors.blue.400"),
						},
					},
				},
			}),
		},
	},
	plugins: [typography],
} satisfies Config;
