import type { Meta, StoryObj } from "@storybook/react";
import {
	ChatIcon,
	LightningIcon,
	UserIcon,
	SendIcon,
	MoonIcon,
	SunIcon,
} from "../ui/icons";

const meta = {
	title: "UI/Icons",
	component: ChatIcon,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ChatIcon>;

export default meta;

export const Chat: StoryObj<typeof ChatIcon> = {
	render: () => <ChatIcon className="w-8 h-8 text-blue-500" />,
};

export const Lightning: StoryObj<typeof LightningIcon> = {
	render: () => <LightningIcon className="w-8 h-8 text-yellow-500" />,
};

export const User: StoryObj<typeof UserIcon> = {
	render: () => <UserIcon className="w-8 h-8 text-green-500" />,
};

export const Send: StoryObj<typeof SendIcon> = {
	render: () => <SendIcon className="w-8 h-8 text-purple-500" />,
};

export const Moon: StoryObj<typeof MoonIcon> = {
	render: () => <MoonIcon className="w-8 h-8 text-gray-700" />,
};

export const Sun: StoryObj<typeof SunIcon> = {
	render: () => <SunIcon className="w-8 h-8 text-amber-500" />,
};

// Display all icons together
export const AllIcons: StoryObj<typeof ChatIcon> = {
	render: () => (
		<div className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
			<ChatIcon className="w-8 h-8" />
			<LightningIcon className="w-8 h-8" />
			<UserIcon className="w-8 h-8" />
			<SendIcon className="w-8 h-8" />
			<MoonIcon className="w-8 h-8" />
			<SunIcon className="w-8 h-8" />
		</div>
	),
};
