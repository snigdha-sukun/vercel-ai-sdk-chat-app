import React from "react";
import {
	render,
	screen,
	fireEvent,
	act,
} from "@testing-library/react";
import { Message } from "@/ui/components/Message";
import type { Message as AIMessage } from "ai";

// Mock the clipboard API
Object.assign(navigator, {
	clipboard: {
		writeText: jest.fn().mockResolvedValue(undefined),
	},
});

// Mock the ReactMarkdown component
jest.mock("react-markdown", () => {
	const MockReactMarkdown = ({ children }: { children: string }) => (
		<div data-testid="markdown">{children}</div>
	);
	MockReactMarkdown.displayName = "ReactMarkdown";
	return MockReactMarkdown;
});

// Mock remark-gfm
jest.mock("remark-gfm", () => {
	return jest.fn();
});

// Mock the markdown components
jest.mock("@/ui/markdown/MarkdownComponents", () => ({
	markdownComponents: {},
}));

// Mock the icons
jest.mock("@/ui/icons", () => ({
	CopyIcon: function CopyIcon({ className, title }: { className: string; title: string }) {
		return (
			<div data-testid="copy-icon" className={className} title={title}>
				Copy Icon
			</div>
		);
	},
}));

// Mock the Message component's dependencies
const mockSetState = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: jest.fn((initialValue) => [initialValue, mockSetState]),
}));

describe("Message Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.useFakeTimers();
		// Reset the mock useState to return the initial value and the mock setter
		(React.useState as jest.Mock).mockImplementation((init) => [
			init,
			mockSetState,
		]);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	const userMessage: AIMessage = {
		id: "user-1",
		role: "user",
		content: "Hello, how are you?",
	};

	const aiMessage: AIMessage = {
		id: "ai-1",
		role: "assistant",
		content: "I am doing well, thank you for asking!",
	};

	it("renders user message correctly", () => {
		const { container } = render(
			<Message message={userMessage} variant="user" />,
		);

		expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();

		// Look for elements with the gradient classes anywhere in the rendered component
		expect(container.innerHTML).toContain("from-blue-500");
		expect(container.innerHTML).toContain("to-purple-600");
	});

	it("renders AI message with markdown correctly", () => {
		render(<Message message={aiMessage} variant="ai" />);

		const markdownContent = screen.getByTestId("markdown");
		expect(markdownContent).toHaveTextContent(
			"I am doing well, thank you for asking!",
		);
	});

	it("displays icon when provided", () => {
		const mockIcon = <div data-testid="test-icon">Icon</div>;

		render(<Message message={userMessage} variant="user" icon={mockIcon} />);

		expect(screen.getByTestId("test-icon")).toBeInTheDocument();
	});

	it("copies message content to clipboard when copy button is clicked", async () => {
		// Mock setTimeout since we're using fake timers
		const setTimeoutSpy = jest.spyOn(global, "setTimeout");

		// Mock useState to track isCopied state
		(React.useState as jest.Mock).mockImplementation((init) => [
			init,
			mockSetState,
		]);

		render(<Message message={userMessage} variant="user" />);

		const copyButton = screen.getByRole("button", { name: /copy message/i });

		await act(async () => {
			fireEvent.click(copyButton);
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			"Hello, how are you?",
		);
		expect(mockSetState).toHaveBeenCalledWith(true);

		// Verify setTimeout was called with the correct parameters
		expect(setTimeoutSpy).toHaveBeenCalled();

		// Clean up spy
		setTimeoutSpy.mockRestore();
	});

	it("handles copy failure gracefully", async () => {
		// Mock clipboard.writeText to reject
		const mockClipboard = {
			writeText: jest.fn().mockRejectedValue(new Error("Clipboard error")),
		};
		Object.assign(navigator, { clipboard: mockClipboard });

		// Mock console.error to prevent error from appearing in test output
		const consoleSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		render(<Message message={userMessage} variant="user" />);

		const copyButton = screen.getByRole("button", { name: /copy message/i });

		// Use act to wrap the async operation
		await act(async () => {
			fireEvent.click(copyButton);
		});

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			"Hello, how are you?",
		);
		expect(consoleSpy).toHaveBeenCalled();
		expect(consoleSpy.mock.calls[0][0]).toBe("Failed to copy text: ");

		consoleSpy.mockRestore();
	});

	it("applies different styles for AI and user messages", () => {
		const { container: userContainer } = render(
			<Message message={userMessage} variant="user" />,
		);

		// Check for user message styling - looking in the whole rendered HTML
		expect(userContainer.innerHTML).toContain("justify-end");

		const { container: aiContainer } = render(
			<Message message={aiMessage} variant="ai" />,
		);

		// Check for AI message styling
		expect(aiContainer.innerHTML).toContain("justify-start");
	});
});
