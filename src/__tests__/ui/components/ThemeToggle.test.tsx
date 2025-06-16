import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/ui/components/ThemeToggle";

// Mock icons
jest.mock("@/ui/icons", () => ({
	MoonIcon: () => <div data-testid="moon-icon">Moon</div>,
	SunIcon: () => <div data-testid="sun-icon">Sun</div>,
}));

describe("ThemeToggle Component", () => {
	const mockToggleTheme = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("displays moon icon when theme is light", () => {
		render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);

		expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
		expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveAttribute(
			"aria-label",
			"Switch to dark mode",
		);
	});

	it("displays sun icon when theme is dark", () => {
		render(<ThemeToggle theme="dark" toggleTheme={mockToggleTheme} />);

		expect(screen.queryByTestId("moon-icon")).not.toBeInTheDocument();
		expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
		expect(screen.getByRole("button")).toHaveAttribute(
			"aria-label",
			"Switch to light mode",
		);
	});

	it("calls toggleTheme when button is clicked", () => {
		render(<ThemeToggle theme="light" toggleTheme={mockToggleTheme} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(mockToggleTheme).toHaveBeenCalledTimes(1);
	});

	it("applies additional classNames when provided", () => {
		render(
			<ThemeToggle
				theme="light"
				toggleTheme={mockToggleTheme}
				className="test-class"
			/>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("test-class");
		expect(button).toHaveClass("p-2", "rounded-full"); // Default classes
	});
});
