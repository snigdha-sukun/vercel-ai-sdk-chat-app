"use client";

import { useChat } from "@ai-sdk/react";
import { useTheme } from "@/context/ThemeContext";
import {
	ChatHeader,
	ChatInput,
	MessageList,
	ThemeToggle,
} from "@/ui/components";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, status, data } =
		useChat();
	const { theme, toggleTheme } = useTheme();

	// Determine loading state based on the status value
	const isLoading = status === "streaming" || status === "submitted";

	return (
		<div
			className={`min-h-screen ${
				theme === "dark"
					? "bg-gradient-to-br from-gray-900 to-indigo-950"
					: "bg-gradient-to-br from-blue-50 to-indigo-100"
			}`}
		>
			<div className="container mx-auto px-4 py-6 sm:py-8 flex flex-col min-h-screen">
				<div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
					<ChatHeader
						rightElement={
							<ThemeToggle theme={theme} toggleTheme={toggleTheme} />
						}
					/>

					{/* Chat Container */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden flex-1 flex flex-col">
						<MessageList
							messages={messages}
							data={
								Array.isArray(data)
									? Object.fromEntries(
											data.map((item, index) => [index.toString(), item]),
										)
									: data
							}
						/>
						<ChatInput
							input={input}
							handleInputChange={handleInputChange}
							handleSubmit={handleSubmit}
							isLoading={isLoading}
						/>
					</div>

					{/* Footer */}
					<div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
						<p>© {new Date().getFullYear()} - Vercel AI SDK Demo</p>
					</div>
				</div>
			</div>
		</div>
	);
}
