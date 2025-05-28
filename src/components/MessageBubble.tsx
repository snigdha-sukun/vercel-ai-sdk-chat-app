import type { Message } from "ai";
import { AIMessage } from "./message/AIMessage";
import { UserMessage } from "./message/UserMessage";

interface MessageBubbleProps {
	message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
	const isUser = message.role === "user";

	return isUser ? (
		<UserMessage message={message} />
	) : (
		<AIMessage message={message} />
	);
}
