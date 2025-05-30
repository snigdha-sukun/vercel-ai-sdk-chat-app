import type { Message } from "ai";
import { Message as MessageComponent } from "./Message";
import { ChatIcon, UserIcon } from "../icons";
import type { ReactNode } from "react";
import { cn } from "../utils/classNames";

export interface MessageListProps {
	readonly messages: Message[];
	readonly data?: Record<string, unknown>;
	readonly className?: string;
	readonly emptyState?: ReactNode;
}

export function MessageList({
	messages,
	data,
	className,
	emptyState,
}: MessageListProps) {
	return (
		<div
			className={cn(
				"h-[400px] sm:h-[500px] lg:h-[600px] overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-gray-800",
				className,
			)}
		>
			{messages.length === 0
				? emptyState || (
						<div className="flex items-center justify-center h-full">
							<div className="text-center max-w-md">
								<div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
									<ChatIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
								</div>
								<h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
									Start a new conversation
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									Send a message to begin interacting with the AI assistant.
								</p>
							</div>
						</div>
					)
				: messages.map((message) => (
						<MessageComponent
							key={message.id}
							message={message}
							variant={message.role === "user" ? "user" : "ai"}
							icon={
								message.role === "user" ? (
									<UserIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
								) : (
									<ChatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
								)
							}
						/>
					))}

			{data && (
				<div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 sm:p-4">
					<h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 text-sm sm:text-base">
						Debug Data:
					</h4>
					<pre className="text-xs text-yellow-700 dark:text-yellow-200 overflow-x-auto">
						{JSON.stringify(data, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
