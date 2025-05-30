import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ThemeToggle } from "../ui/components/ThemeToggle";

const meta = {
	title: "UI/ThemeToggle",
	component: ThemeToggle,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

// Create an interactive version of the ThemeToggle for Storybook
const InteractiveThemeToggle = (args: { theme?: "light" | "dark"; className?: string; toggleTheme?: () => void }) => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<div
			className={
				theme === "dark"
					? "bg-gray-800 p-8 rounded-lg"
					: "bg-white p-8 rounded-lg border"
			}
		>
			<ThemeToggle {...args} theme={theme} toggleTheme={toggleTheme} />
		</div>
	);
};

export const Default: StoryObj<typeof ThemeToggle> = {
	render: (args) => <InteractiveThemeToggle {...args} />,
};

export const WithCustomClass: StoryObj<typeof ThemeToggle> = {
	render: (args) => (
		<InteractiveThemeToggle
			{...args}
			className="bg-gray-100 dark:bg-gray-700"
			theme="light"
		/>
	),
};
