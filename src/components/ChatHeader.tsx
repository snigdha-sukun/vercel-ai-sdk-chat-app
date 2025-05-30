import ThemeToggle from "./ThemeToggle";

interface ChatHeaderProps {
	readonly className?: string;
}

export default function ChatHeader({ className = "" }: ChatHeaderProps) {
	return (
		<div className={`text-center mb-4 sm:mb-8 ${className} relative`}>
			<div className="absolute right-0 top-0">
				<ThemeToggle />
			</div>
			<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
				AI Chat Assistant
			</h1>
			<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
				Powered by Vercel AI SDK & Google Gemini
			</p>
		</div>
	);
}
