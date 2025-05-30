import { SendIcon } from "@/components/icons";
import type { FormEvent, ChangeEvent } from "react";

interface ChatInputProps {
	readonly input: string;
	readonly handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	readonly handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function ChatInput({
	input,
	handleInputChange,
	handleSubmit,
}: ChatInputProps) {
	return (
		<div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-6 bg-gray-50 dark:bg-gray-800">
			<form
				onSubmit={handleSubmit}
				className="flex items-center space-x-2 sm:space-x-4"
			>
				<div className="flex-1 relative">
					<input
						className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
						value={input}
						placeholder="Type your message..."
						onChange={handleInputChange}
					/>
					<button
						type="submit"
						disabled={!input.trim()}
						className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
					>
						<SendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
					</button>
				</div>
			</form>
			<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center hidden sm:block">
				Press Enter to send • AI responses are generated in real-time
			</p>
			<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center sm:hidden">
				Tap to send
			</p>
		</div>
	);
}
