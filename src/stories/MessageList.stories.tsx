import type { Meta, StoryObj } from "@storybook/react";
import { MessageList } from "../ui/components/MessageList";

const meta = {
	title: "UI/MessageList",
	component: MessageList,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof MessageList>;

export default meta;

// Sample messages for our stories
import type { Message } from "ai";

const sampleMessages: Message[] = [
	{
		id: "1",
		role: "user",
		content: "Hello, how are you today?",
		createdAt: new Date(),
	},
	{
		id: "2",
		role: "assistant",
		content: "I'm doing well, thank you! How can I help you today?",
		createdAt: new Date(),
	},
	{
		id: "3",
		role: "user",
		content: "Can you explain how to use React hooks?",
		createdAt: new Date(),
	},
	{
		id: "4",
		role: "assistant",
		content:
			"React Hooks are functions that let you use React state and lifecycle features in functional components. Some commonly used hooks include:\n\n• useState: For managing state\n• useEffect: For side effects\n• useContext: For accessing context\n• useReducer: For complex state logic\n• useRef: For accessing DOM elements\n\nFor example, to use the useState hook:\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nWould you like me to explain any specific hook in more detail?",
		createdAt: new Date(),
	},
];

export const WithMessages: StoryObj<typeof MessageList> = {
	args: {
		messages: sampleMessages,
	},
};

export const EmptyState: StoryObj<typeof MessageList> = {
	args: {
		messages: [],
	},
};

export const WithDebugData: StoryObj<typeof MessageList> = {
	args: {
		messages: sampleMessages,
		data: {
			model: "gpt-4",
			temperature: 0.7,
			tokens: {
				prompt: 120,
				completion: 230,
				total: 350,
			},
			timing: {
				startTime: "2025-05-30T10:45:23.123Z",
				endTime: "2025-05-30T10:45:25.456Z",
				totalTime: 2333,
			},
		},
	},
};
