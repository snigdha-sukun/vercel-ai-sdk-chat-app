import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ChatInput } from "@/ui/components/ChatInput";

describe("ChatInput Component", () => {
	const defaultProps = {
		input: "",
		handleInputChange: jest.fn(),
		handleSubmit: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders with default props", () => {
		render(<ChatInput {...defaultProps} />);

		// Check if the input field is rendered
		const inputElement = screen.getByPlaceholderText("Type your message...");
		expect(inputElement).toBeInTheDocument();

		// Check if the send button is rendered and disabled when input is empty
		const sendButton = screen.getByRole("button", { name: /send message/i });
		expect(sendButton).toBeInTheDocument();
		expect(sendButton).toBeDisabled();

		// Check if help text is visible
		expect(screen.getByText(/Press Enter to send/)).toBeInTheDocument();
		expect(screen.getByText(/Tap to send/)).toBeInTheDocument();
	});

	it("enables the send button when input is not empty", () => {
		const props = {
			...defaultProps,
			input: "Hello, world!",
		};

		render(<ChatInput {...props} />);

		const sendButton = screen.getByRole("button", { name: /send message/i });
		expect(sendButton).not.toBeDisabled();
	});

	it("calls handleInputChange when input changes", () => {
		render(<ChatInput {...defaultProps} />);

		const inputElement = screen.getByPlaceholderText("Type your message...");
		fireEvent.change(inputElement, { target: { value: "New message" } });

		expect(defaultProps.handleInputChange).toHaveBeenCalledTimes(1);
	});

	it("calls handleSubmit when form is submitted", () => {
		const props = {
			...defaultProps,
			input: "Test message",
		};

		render(<ChatInput {...props} />);

		const form = screen
			.getByRole("button", { name: /send message/i })
			.closest("form");
		if (form) {
			fireEvent.submit(form);
		}

		expect(defaultProps.handleSubmit).toHaveBeenCalledTimes(1);
	});

	it("disables input and button when isLoading is true", () => {
		const props = {
			...defaultProps,
			input: "Test message",
			isLoading: true,
		};

		render(<ChatInput {...props} />);

		const inputElement = screen.getByPlaceholderText("Type your message...");
		expect(inputElement).toBeDisabled();

		const sendButton = screen.getByRole("button", { name: /send message/i });
		expect(sendButton).toBeDisabled();
	});

	it("does not show help text when showHelpText is false", () => {
		const props = {
			...defaultProps,
			showHelpText: false,
		};

		render(<ChatInput {...props} />);

		expect(screen.queryByText(/Press Enter to send/)).not.toBeInTheDocument();
		expect(screen.queryByText(/Tap to send/)).not.toBeInTheDocument();
	});
});
