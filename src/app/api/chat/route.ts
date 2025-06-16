import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import type { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
	try {
		const { messages } = await req.json();

		// Validate that messages exist and is an array
		if (!messages || !Array.isArray(messages)) {
			return new Response(
				JSON.stringify({
					error: "Invalid request: messages array is required",
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const result = streamText({
			model: google("gemini-2.0-flash-exp"),
			messages,
		});

		return result.toDataStreamResponse();
	} catch (error) {
		// Only log errors in non-test environments to reduce test noise
		if (process.env.NODE_ENV !== 'test') {
			console.error("Error in chat API:", error);
		}

		// More specific error handling
		if (error instanceof SyntaxError) {
			return new Response(
				JSON.stringify({
					error: "Invalid JSON in request body",
				}),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return new Response(
			JSON.stringify({
				error: "An error occurred while processing your request",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
