import type { Message } from "ai";
import MessageBubble from "./MessageBubble";
import EmptyState from "./EmptyState";

interface MessageListProps {
	readonly messages: Message[];
	readonly data?: Record<string, unknown>;
}

export default function MessageList({ messages, data }: MessageListProps) {
	return (
		<div className="h-[400px] sm:h-[500px] lg:h-[600px] overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-white dark:bg-gray-800">
			{messages.length === 0 ? (
				<EmptyState />
			) : (
				messages.map((message) => (
					<MessageBubble key={message.id} message={message} />
				))
			)}

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
