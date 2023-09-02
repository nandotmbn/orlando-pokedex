import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontSize: {
				xxs: ".6rem",
				xs: ".75rem",
				sm: ".875rem",
				base: "1rem",
				lg: "1.125rem",
				xl: "1.25rem",
				"2xl": "1.5rem",
				"3xl": "1.875rem",
				"4xl": "2.25rem",
				"5xl": "3rem",
				"6xl": "4rem",
				"7xl": "5rem",
				"8xl": "6rem",
				"9xl": "8rem",
			},
			container: {
				center: true,
			},
			minHeight: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
				24: "5rem",
			},
			maxWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
				24: "6rem",
				34: "8rem",
				44: "10rem",
				45: "12rem",
				48: "14rem",
				50: "16rem",
			},
			extend: {
				opacity: ["disabled"],
			},
			screens: {
				sm: "640px",

				md: "768px",

				lg: "1024px",

				xl: "1280px",

				"2xl": "1536px",
			},
			flex: {
				1: "1 1 0%",
				auto: "1 1 auto",
				initial: "0 1 auto",
				inherit: "inherit",
				none: "none",
				2: "2 2 0%",
				3: "3 3 0%",
				4: "4 4 0%",
				5: "5 5 0%",
				6: "6 6 0%",
				7: "7 7 0%",
				8: "8 8 0%",
				9: "9 9 0%",
				10: "10 10 0%",
				11: "11 11 0%",
				12: "12 12 0%",
				13: "13 13 0%",
				14: "14 14 0%",
				15: "15 15 0%",
				16: "16 16 0%",
				17: "17 17 0%",
				18: "18 18 0%",
				19: "19 19 0%",
				20: "20 20 0%",
			},
		},
	},
	plugins: [],
};
export default config;
