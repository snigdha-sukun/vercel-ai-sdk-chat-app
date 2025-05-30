import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils/classNames";
import type { Message as AIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../markdown/MarkdownComponents";
import { CopyIcon } from "../icons";

export interface MessageProps {
	readonly message: AIMessage;
	readonly variant?: "user" | "ai";
	readonly icon?: ReactNode;
}

export function Message({ message, variant = "ai", icon }: MessageProps) {
	const isUser = variant === "user";
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(message.content);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div
			className={cn(
				"flex mb-3 sm:mb-4",
				isUser ? "justify-end" : "justify-start",
			)}
		>
			<div
				className={cn(
					"max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm relative group",
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

				{/* Copy button */}
				<button
					type="button"
					onClick={copyToClipboard}
					aria-label="Copy message"
					className={cn(
						"absolute right-2 top-2 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity",
						isUser
							? "bg-white/20 hover:bg-white/30 text-white"
							: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200",
						isCopied &&
							"bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700",
					)}
				>
					<CopyIcon
						className="w-3.5 h-3.5"
						title={isCopied ? "Copied!" : "Copy to clipboard"}
					/>
					{isCopied && (
						<span className="absolute bottom-full right-0 mb-1 text-xs font-medium py-0.5 px-1.5 bg-gray-800 text-white rounded shadow-lg">
							Copied!
						</span>
					)}
				</button>
			</div>
		</div>
	);
}
