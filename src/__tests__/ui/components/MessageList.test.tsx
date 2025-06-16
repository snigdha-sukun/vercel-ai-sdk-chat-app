import React from "react";
import { render, screen } from "@testing-library/react";
import { MessageList } from "@/ui/components/MessageList";
import type { Message } from "ai";

// Mock the Message component
jest.mock("@/ui/components/Message", () => ({
	Message: ({ message, variant }: { message: Message; variant: string }) => (
		<div data-testid={`message-${message.id}`} className={`message-${variant}`}>
			{message.content}
		</div>
	),
}));

// Mock icons
jest.mock("@/ui/icons", () => ({
	ChatIcon: () => <div data-testid="chat-icon">ChatIcon</div>,
	UserIcon: () => <div data-testid="user-icon">UserIcon</div>,
}));

describe("MessageList Component", () => {
	it("renders empty state when no messages are provided", () => {
		render(<MessageList messages={[]} />);

		expect(screen.getByText("Start a new conversation")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Send a message to begin interacting with the AI assistant.",
			),
		).toBeInTheDocument();
	});

	it("renders custom empty state when provided", () => {
		const customEmptyState = <div>Custom Empty State</div>;
		render(<MessageList messages={[]} emptyState={customEmptyState} />);

		expect(screen.getByText("Custom Empty State")).toBeInTheDocument();
		expect(
			screen.queryByText("Start a new conversation"),
		).not.toBeInTheDocument();
	});

	it("renders messages when provided", () => {
		const messages: Message[] = [
			{ id: "1", role: "user", content: "Hello" },
			{ id: "2", role: "assistant", content: "Hi there!" },
		];

		render(<MessageList messages={messages} />);

		expect(screen.getByTestId("message-1")).toBeInTheDocument();
		expect(screen.getByTestId("message-2")).toBeInTheDocument();
		expect(screen.getByText("Hello")).toBeInTheDocument();
		expect(screen.getByText("Hi there!")).toBeInTheDocument();
	});

	it("renders with the correct message variants", () => {
		const messages: Message[] = [
			{ id: "1", role: "user", content: "Hello" },
			{ id: "2", role: "assistant", content: "Hi there!" },
		];

		render(<MessageList messages={messages} />);

		const userMessage = screen.getByTestId("message-1");
		const aiMessage = screen.getByTestId("message-2");

		expect(userMessage).toHaveClass("message-user");
		expect(aiMessage).toHaveClass("message-ai");
	});

	it("displays debug data when provided", () => {
		const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];

		const debugData = { test: "data", number: 42 };

		render(<MessageList messages={messages} data={debugData} />);

		expect(screen.getByText("Debug Data:")).toBeInTheDocument();
		expect(screen.getByText(/"test": "data"/)).toBeInTheDocument();
		expect(screen.getByText(/"number": 42/)).toBeInTheDocument();
	});

	it("does not display debug section when no data is provided", () => {
		const messages: Message[] = [{ id: "1", role: "user", content: "Hello" }];

		render(<MessageList messages={messages} />);

		expect(screen.queryByText("Debug Data:")).not.toBeInTheDocument();
	});
});
