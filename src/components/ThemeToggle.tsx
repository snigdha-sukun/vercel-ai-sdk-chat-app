"use client";

import { useTheme } from "@/context/ThemeContext";
import { MoonIcon, SunIcon } from "./icons";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<MoonIcon className="w-5 h-5 text-gray-700" />
			) : (
				<SunIcon className="w-5 h-5 text-yellow-300" />
			)}
		</button>
	);
}
