import { POST } from "@/app/api/chat/route";
import { streamText } from "ai";
import type { NextRequest } from "next/server";

// Mock the streamText function from the ai module
jest.mock("ai", () => ({
	streamText: jest.fn(),
}));

describe("Chat API Route", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should handle valid requests with messages array", async () => {
		// Arrange
		const mockRequest = {
			json: jest.fn().mockResolvedValue({
				messages: [{ role: "user", content: "Hello" }],
			}),
		} as unknown as NextRequest;

		const mockDataStreamResponse = {
			toDataStreamResponse: jest.fn().mockReturnValue({ test: "response" }),
		};

		(streamText as jest.Mock).mockReturnValue(mockDataStreamResponse);

		// Act
		await POST(mockRequest);

		// Assert
		expect(mockRequest.json).toHaveBeenCalled();
		expect(streamText).toHaveBeenCalledWith({
			model: expect.anything(), // We're not testing the exact model used
			messages: [{ role: "user", content: "Hello" }],
		});
		expect(mockDataStreamResponse.toDataStreamResponse).toHaveBeenCalled();
	});

	it("should return a 400 response when messages is missing", async () => {
		// Arrange
		const mockRequest = {
			json: jest.fn().mockResolvedValue({}),
		} as unknown as NextRequest;

		// Act
		const response = await POST(mockRequest);

		// Assert
		expect(response.status).toBe(400);
		const responseData = await response.json();
		expect(responseData).toEqual({
			error: "Invalid request: messages array is required",
		});
	});

	it("should return a 400 response when messages is not an array", async () => {
		// Arrange
		const mockRequest = {
			json: jest.fn().mockResolvedValue({
				messages: "not an array",
			}),
		} as unknown as NextRequest;

		// Act
		const response = await POST(mockRequest);

		// Assert
		expect(response.status).toBe(400);
		const responseData = await response.json();
		expect(responseData).toEqual({
			error: "Invalid request: messages array is required",
		});
	});

	it("should return a 400 response when request body is invalid JSON", async () => {
		// Arrange
		const mockRequest = {
			json: jest.fn().mockRejectedValue(new SyntaxError("Invalid JSON")),
		} as unknown as NextRequest;

		// Act
		const response = await POST(mockRequest);

		// Assert
		expect(response.status).toBe(400);
		const responseData = await response.json();
		expect(responseData).toEqual({
			error: "Invalid JSON in request body",
		});
	});

	it("should return a 500 response for other errors", async () => {
		// Arrange
		const mockRequest = {
			json: jest.fn().mockRejectedValue(new Error("Some other error")),
		} as unknown as NextRequest;

		// Act
		const response = await POST(mockRequest);

		// Assert
		expect(response.status).toBe(500);
		const responseData = await response.json();
		expect(responseData).toEqual({
			error: "An error occurred while processing your request",
		});
	});
});
