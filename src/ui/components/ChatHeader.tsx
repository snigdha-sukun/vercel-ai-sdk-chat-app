import type { ReactNode } from "react";
import { cn } from "../utils/classNames";

export interface ChatHeaderProps {
	readonly className?: string;
	readonly title?: string;
	readonly subtitle?: string;
	readonly rightElement?: ReactNode;
}

export function ChatHeader({
	className,
	title = "AI Chat Assistant",
	subtitle = "Powered by Vercel AI SDK & Google Gemini",
	rightElement,
}: ChatHeaderProps) {
	return (
		<div className={cn("text-center mb-4 sm:mb-8 relative", className)}>
			{rightElement && (
				<div className="absolute right-0 top-0">{rightElement}</div>
			)}
			<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
				{title}
			</h1>
			<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
				{subtitle}
			</p>
		</div>
	);
}
