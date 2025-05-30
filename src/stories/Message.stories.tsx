import type { Meta, StoryObj } from "@storybook/react";
import { Message } from "../ui/components/Message";
import { UserIcon, ChatIcon } from "../ui/icons";

const meta = {
	title: "UI/Message",
	component: Message,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;

export const UserMessage: StoryObj<typeof Message> = {
	args: {
		variant: "user",
		message: {
			id: "1",
			role: "user",
			content: "Hello, how are you today?",
			createdAt: new Date(),
		},
		icon: <UserIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
	},
};

export const AIMessage: StoryObj<typeof Message> = {
	args: {
		variant: "ai",
		message: {
			id: "2",
			role: "assistant",
			content: "I'm doing well, thank you! How can I help you today?",
			createdAt: new Date(),
		},
		icon: <ChatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
	},
};

export const LongMessage: StoryObj<typeof Message> = {
	args: {
		variant: "ai",
		message: {
			id: "3",
			role: "assistant",
			content:
				"This is a much longer message that demonstrates how the component handles more content. It should wrap properly and maintain the correct styling regardless of content length. The component is designed to be responsive and adjust well on different screen sizes.",
			createdAt: new Date(),
		},
		icon: <ChatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
	},
};
