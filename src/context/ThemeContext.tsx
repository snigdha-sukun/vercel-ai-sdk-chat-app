"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useMemo,
	useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [theme, setTheme] = useState<Theme>("light");

	// Initialize theme from localStorage when component mounts (client-side only)
	useEffect(() => {
		// Check for user's stored preference
		const storedTheme = localStorage.getItem("theme") as Theme;
		// Check for system preference if no stored preference
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.classList.toggle("dark", storedTheme === "dark");
		} else if (prefersDark) {
			setTheme("dark");
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			document.documentElement.classList.toggle("dark", newTheme === "dark");
			return newTheme;
		});
	}, []);

	// Memoize the context value to prevent unnecessary re-renders
	const contextValue = useMemo(
		() => ({ theme, toggleTheme }),
		[theme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
