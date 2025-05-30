import type { Meta, StoryObj } from "@storybook/react";
import { ChatHeader } from "../ui/components/ChatHeader";
import { SunIcon } from "../ui/icons";

const meta = {
	title: "UI/ChatHeader",
	component: ChatHeader,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ChatHeader>;

export default meta;

export const Default: StoryObj<typeof ChatHeader> = {};

export const CustomTitle: StoryObj<typeof ChatHeader> = {
	args: {
		title: "Custom Chat Title",
		subtitle: "Your personalized chat experience",
	},
};

export const WithRightElement: StoryObj<typeof ChatHeader> = {
	args: {
		rightElement: (
			<button type="button" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
				<SunIcon className="w-5 h-5" />
			</button>
		),
	},
};

export const WithCustomStyles: StoryObj<typeof ChatHeader> = {
	args: {
		title: "Custom Styled Header",
		subtitle: "With custom background styling",
		className:
			"p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg shadow-sm",
	},
};
