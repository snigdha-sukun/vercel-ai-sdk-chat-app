import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChatInput } from "../ui/components/ChatInput";

const meta = {
	title: "UI/ChatInput",
	component: ChatInput,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ChatInput>;

export default meta;

// Create an interactive version of the ChatInput for Storybook
const InteractiveChatInput = (args: React.ComponentProps<typeof ChatInput>) => {
	const [input, setInput] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(`Message submitted: ${input}`);
		setInput("");
	};

	return (
		<ChatInput
			{...args}
			input={input}
			handleInputChange={handleInputChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export const Default: StoryObj<typeof ChatInput> = {
	render: (args) => <InteractiveChatInput {...args} />,
};

export const WithoutHelpText: StoryObj<typeof ChatInput> = {
	render: (args) => <InteractiveChatInput {...args} showHelpText={false} />,
};

export const WithCustomClassName: StoryObj<typeof ChatInput> = {
	render: (args) => (
		<InteractiveChatInput {...args} className="rounded-lg shadow-xl" />
	),
};
