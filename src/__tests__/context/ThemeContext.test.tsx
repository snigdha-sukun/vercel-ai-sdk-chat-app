import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import React from "react";

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {};

	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value.toString();
		}),
		clear: jest.fn(() => {
			store = {};
		}),
	};
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock the matchMedia function
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false, // Default to light mode preference
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Test component that consumes the theme context
function TestComponent() {
	const { theme, toggleTheme } = useTheme();
	return (
		<div>
			<div data-testid="theme-value">{theme}</div>
			<button type="button" data-testid="toggle-theme" onClick={toggleTheme}>
				Toggle Theme
			</button>
		</div>
	);
}

describe("ThemeContext", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		document.documentElement.classList.remove("dark");
		localStorageMock.clear();
	});

	it("provides light theme by default", () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>,
		);

		expect(screen.getByTestId("theme-value").textContent).toBe("light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("uses dark theme if stored in localStorage", () => {
		// Set localStorage to have dark theme
		localStorageMock.getItem.mockReturnValueOnce("dark");

		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>,
		);

		// Need to manually trigger useEffect since localStorage mock won't automatically trigger it
		act(() => {
			// Trigger effects
		});

		expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
		expect(screen.getByTestId("theme-value").textContent).toBe("dark");
	});

	it("toggles theme when button is clicked", () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>,
		);

		// Initial state
		expect(screen.getByTestId("theme-value").textContent).toBe("light");

		// Toggle theme
		fireEvent.click(screen.getByTestId("toggle-theme"));

		// Check if theme changed
		expect(screen.getByTestId("theme-value").textContent).toBe("dark");
		expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);

		// Toggle again
		fireEvent.click(screen.getByTestId("toggle-theme"));

		// Check if theme changed back
		expect(screen.getByTestId("theme-value").textContent).toBe("light");
		expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});

	it("uses system dark mode preference if no stored theme", () => {
		// Mock system preference for dark mode
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: query.includes("dark"),
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});

		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>,
		);

		// Need to manually trigger useEffect
		act(() => {
			// Trigger effects
		});

		expect(screen.getByTestId("theme-value").textContent).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("throws error when useTheme is used outside ThemeProvider", () => {
		// Suppress console errors for this test
		const consoleErrorSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {});

		expect(() => {
			render(<TestComponent />);
		}).toThrow("useTheme must be used within a ThemeProvider");

		consoleErrorSpy.mockRestore();
	});
});
