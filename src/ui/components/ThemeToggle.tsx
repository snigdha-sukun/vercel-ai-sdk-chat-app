import { MoonIcon, SunIcon } from "../icons";
import { cn } from "../utils/classNames";

export interface ThemeToggleProps {
	readonly theme: "light" | "dark";
	readonly toggleTheme: () => void;
	readonly className?: string;
}

export function ThemeToggle({
	theme,
	toggleTheme,
	className,
}: ThemeToggleProps) {
	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={cn(
				"p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm",
				className,
			)}
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
		>
			{theme === "light" ? (
				<MoonIcon className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
			) : (
				<SunIcon className="w-5 h-5 text-yellow-500" />
			)}
		</button>
	);
}
