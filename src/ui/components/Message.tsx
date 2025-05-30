import type { ReactNode } from "react";
import { cn } from "../utils/classNames";
import type { Message as AIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../markdown/MarkdownComponents";

export interface MessageProps {
	readonly message: AIMessage;
	readonly variant?: "user" | "ai";
	readonly icon?: ReactNode;
}

export function Message({ message, variant = "ai", icon }: MessageProps) {
	const isUser = variant === "user";

	return (
		<div
			className={cn(
				"flex mb-3 sm:mb-4",
				isUser ? "justify-end" : "justify-start",
			)}
		>
			<div
				className={cn(
					"max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm",
					isUser
						? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-2 sm:ml-4"
						: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-2 sm:mr-4",
				)}
			>
				<div className="flex items-start space-x-1.5 sm:space-x-2">
					{icon && (
						<div
							className={cn(
								"w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1",
								isUser ? "bg-white bg-opacity-20" : "bg-blue-500",
							)}
						>
							{icon}
						</div>
					)}
					<div className="leading-relaxed text-sm sm:text-base flex-1 min-w-0">
						{isUser ? (
							<div className="whitespace-pre-wrap break-words">
								{message.content}
							</div>
						) : (
							<div className="prose dark:prose-invert prose-sm sm:prose-base max-w-none">
								<ReactMarkdown
									remarkPlugins={[remarkGfm]}
									components={markdownComponents}
								>
									{message.content}
								</ReactMarkdown>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
