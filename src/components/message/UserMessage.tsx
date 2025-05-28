import { UserIcon } from "@/components/icons";
import type { Message } from "ai";

interface UserMessageProps {
	readonly message: Message;
}

export function UserMessage({ message }: UserMessageProps) {
	return (
		<div className="flex justify-end mb-3 sm:mb-4">
			<div className="max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-2 sm:ml-4">
				<div className="flex items-start space-x-1.5 sm:space-x-2">
					<div className="leading-relaxed text-sm sm:text-base flex-1 min-w-0">
						<div className="whitespace-pre-wrap">{message.content}</div>
					</div>
					<div className="w-5 h-5 sm:w-6 sm:h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
						<UserIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
					</div>
				</div>
			</div>
		</div>
	);
}
