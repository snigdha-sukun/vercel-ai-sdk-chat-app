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
				"p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors",
				className,
			)}
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
