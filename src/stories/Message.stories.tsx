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
	argTypes: {
		variant: {
			control: "select",
			options: ["user", "ai"],
			description: "The variant of the message - user or AI assistant",
		},
		message: {
			description: "The message content and metadata",
		},
		icon: {
			description: "Icon displayed with the message",
		},
	},
} satisfies Meta<typeof Message>;

export default meta;

// This description is added to showcase the copy functionality in the docs
export const WithCopyFeature: StoryObj<typeof Message> = {
	args: {
		variant: "ai",
		message: {
			id: "copy-demo",
			role: "assistant",
			content:
				"This message has a copy-to-clipboard feature! Hover over the message to see the copy button in the top-right corner.",
			createdAt: new Date(),
		},
		icon: <ChatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Messages now feature a copy-to-clipboard button that appears when hovering over the message. Click the button to copy the message content.",
			},
		},
	},
};

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
