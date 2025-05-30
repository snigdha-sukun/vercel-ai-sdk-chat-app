import { LightningIcon } from "@/components/icons";
import type { Message } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../markdown/MarkdownComponents";

interface AIMessageProps {
	readonly message: Message;
}

export function AIMessage({ message }: AIMessageProps) {
	return (
		<div className="flex justify-start mb-3 sm:mb-4">
			<div className="max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 mr-2 sm:mr-4">
				<div className="flex items-start space-x-1.5 sm:space-x-2">
					<div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
						<LightningIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
					</div>
					<div className="leading-relaxed text-sm sm:text-base flex-1 min-w-0">
						<div className="prose prose-sm sm:prose-base max-w-none prose-gray dark:prose-invert">
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								components={markdownComponents}
							>
								{message.content}
							</ReactMarkdown>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
