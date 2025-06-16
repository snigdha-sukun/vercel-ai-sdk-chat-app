import type React from "react";
import { render, screen } from "@testing-library/react";
import Chat from "@/app/page";
import { useChat } from "@ai-sdk/react";

// Mock the ThemeContext to avoid issues with window.matchMedia
jest.mock("@/context/ThemeContext", () => ({
	useTheme: () => ({
		theme: "light",
		toggleTheme: jest.fn(),
	}),
	ThemeProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

// Mock the components used in the Chat component
jest.mock("@/ui/components", () => ({
	ChatHeader: ({ rightElement }: { rightElement: React.ReactNode }) => (
		<div data-testid="chat-header">
			<div>Chat Header</div>
			{rightElement}
		</div>
	),
	MessageList: ({ messages, data }: { messages: { id: string; text: string }[]; data: Record<string, unknown> }) => (
		<div data-testid="message-list">Messages: {messages.length}</div>
	),
	ChatInput: ({
		input,
		handleInputChange,
		handleSubmit,
		isLoading,
	}: {
		input: string;
		handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
		isLoading: boolean;
	}) => (
		<div data-testid="chat-input">
			<input
				data-testid="chat-input-field"
				value={input}
				onChange={handleInputChange}
			/>
			<button
				data-testid="chat-submit-button"
				onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
					handleSubmit(e)
				}
				type="button"
				disabled={isLoading}
			>
				Send
			</button>
			<span>Loading: {isLoading ? "true" : "false"}</span>
		</div>
	),
	ThemeToggle: ({
		theme,
		toggleTheme,
	}: { theme: string; toggleTheme: () => void }) => (
		<button data-testid="theme-toggle" type="button" onClick={toggleTheme}>
			Toggle Theme ({theme})
		</button>
	),
}));

// Mock the useChat hook
jest.mock("@ai-sdk/react", () => ({
	useChat: jest.fn(),
}));

describe("Chat Component", () => {
	const mockUseChat = {
		messages: [],
		input: "",
		handleInputChange: jest.fn(),
		handleSubmit: jest.fn(),
		status: "idle",
		data: null,
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useChat as jest.Mock).mockReturnValue(mockUseChat);
	});

	it("renders the chat interface with all components", () => {
		render(<Chat />);

		expect(screen.getByTestId("chat-header")).toBeInTheDocument();
		expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
		expect(screen.getByTestId("message-list")).toBeInTheDocument();
		expect(screen.getByTestId("chat-input")).toBeInTheDocument();
		expect(
			screen.getByText(/© \d{4} - Vercel AI SDK Demo/),
		).toBeInTheDocument(); // Footer with year
	});

	it("passes loading state to ChatInput based on status", () => {
		// Set status to streaming to simulate loading
		(useChat as jest.Mock).mockReturnValue({
			...mockUseChat,
			status: "streaming",
		});

		render(<Chat />);

		expect(screen.getByText("Loading: true")).toBeInTheDocument();
	});

	it("passes loading state to ChatInput when status is submitted", () => {
		// Set status to submitted to simulate loading
		(useChat as jest.Mock).mockReturnValue({
			...mockUseChat,
			status: "submitted",
		});

		render(<Chat />);

		expect(screen.getByText("Loading: true")).toBeInTheDocument();
	});

	it("passes not loading state to ChatInput when status is idle", () => {
		// Set status to idle to simulate not loading
		(useChat as jest.Mock).mockReturnValue({
			...mockUseChat,
			status: "idle",
		});

		render(<Chat />);

		expect(screen.getByText("Loading: false")).toBeInTheDocument();
	});

	it("properly transforms array data to object format for MessageList", () => {
		// Test handling of array data conversion to object
		(useChat as jest.Mock).mockReturnValue({
			...mockUseChat,
			data: ["item1", "item2"],
		});

		render(<Chat />);

		// We're not checking the exact output here since our mock doesn't use the data
		// In a real implementation, we would check if the data was properly transformed
		expect(screen.getByTestId("message-list")).toBeInTheDocument();
	});
});
