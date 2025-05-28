"use client";

import { useChat } from "@ai-sdk/react";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, data } = useChat();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
				<div className="max-w-4xl mx-auto">
					<ChatHeader />

					{/* Chat Container */}
					<div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
						<MessageList
							messages={messages}
							data={Array.isArray(data) ? Object.fromEntries(data.map((item, index) => [index.toString(), item])) : data}
						/>
						<ChatInput
							input={input}
							handleInputChange={handleInputChange}
							handleSubmit={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
