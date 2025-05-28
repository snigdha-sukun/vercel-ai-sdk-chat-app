# Vercel AI SDK Demo

This is a demonstration chat application built with the Vercel AI SDK and Next.js. It showcases how to create an AI-powered chat interface using Google's Gemini model.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [How to Use the Chat Application](#how-to-use-the-chat-application)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Chat with an AI assistant in real-time
- See markdown-formatted responses
- Experience streaming text as the AI generates its response
- Have a responsive interface that works on both mobile and desktop

### Features

- Real-time streaming responses using Google's Gemini model
- Clean and responsive UI with Tailwind CSS
- Markdown rendering for AI responses
- Simple and intuitive chat interface

### How to Use the Chat Application

1. Open the application in your browser
2. Type your question or message in the input field at the bottom
3. Press "Send" or hit Enter to submit your message
4. The AI will generate a response in real-time with streaming text

### Screenshot

<!-- Add your GIF showing the chat application in action here -->

### Links

- Solution URL: [Github](https://github.com/snigdha-sukun/vercel-ai-sdk-chat-app)
- Live Site URL: [Vercel](#author)

## My process

### Built with

- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - AI integration toolkit
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Google Gemini](https://ai.google.dev/) - AI model provider

### What I learned

This project demonstrates how to implement streaming AI responses with the Vercel AI SDK and how to create a clean, responsive chat interface. Key learnings include:

- Setting up API routes with Next.js for AI integration

```ts
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
  console.error("Error in chat API:", error);

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
```

- Using React hooks from the AI SDK for state management

```tsx
"use client";

import { useChat } from "@ai-sdk/react";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import ChatInput from "@/components/ChatInput";

export default function Chat() {
 const { messages, input, handleInputChange, handleSubmit, data } = useChat();

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
   <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <div className="max-w-4xl mx-auto">
     <ChatHeader />

     {/* Chat Container */}
     <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
      <MessageList
       messages={messages}
       data={Array.isArray(data) ? Object.fromEntries(data.map((item, index) => [index.toString(), item])) : data}
      />
      <ChatInput
       input={input}
       handleInputChange={handleInputChange}
       handleSubmit={handleSubmit}
      />
     </div>
    </div>
   </div>
  </div>
 );
}
```

- Handling markdown in AI responses

```tsx
import { LightningIcon, UserIcon } from "@/components/icons";
import type { Message } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MessageBubbleProps {
 message: Message;
}

// Define markdown components outside the main component to avoid re-creation
const markdownComponents: Components = {
 h1: ({ children }) => (
  <h1 className="text-lg sm:text-xl font-bold mb-2 mt-0">{children}</h1>
 ),
 h2: ({ children }) => (
  <h2 className="text-base sm:text-lg font-bold mb-2 mt-0">{children}</h2>
 ),
 h3: ({ children }) => (
  <h3 className="text-sm sm:text-base font-bold mb-1 mt-0">{children}</h3>
 ),
 p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
 ul: ({ children }) => (
  <ul className="list-disc list-inside mb-2 space-y-1 pl-4">{children}</ul>
 ),
 ol: ({ children }) => (
  <ol className="list-decimal list-inside mb-2 space-y-1 pl-4">{children}</ol>
 ),
 li: ({ children }) => (
  <li className="text-sm sm:text-base mb-1">{children}</li>
 ),
 table: ({ children }) => (
  <div className="overflow-x-auto mb-4">
   <table className="min-w-full border-collapse border border-gray-300">
    {children}
   </table>
  </div>
 ),
 thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
 tbody: ({ children }) => <tbody>{children}</tbody>,
 tr: ({ children }) => (
  <tr className="border-b border-gray-200">{children}</tr>
 ),
 th: ({ children }) => (
  <th className="border border-gray-300 px-3 py-2 text-left font-bold text-sm">
   {children}
  </th>
 ),
 td: ({ children }) => (
  <td className="border border-gray-300 px-3 py-2 text-sm">{children}</td>
 ),
 code: ({ children, className }) => {
  const isInline = !className?.includes("language-");
  return isInline ? (
   <code className="bg-gray-200 px-1 py-0.5 rounded text-xs sm:text-sm font-mono">
    {children}
   </code>
  ) : (
   <pre className="bg-gray-200 p-2 rounded text-xs sm:text-sm font-mono overflow-x-auto mb-2">
    <code>{children}</code>
   </pre>
  );
 },
 blockquote: ({ children }) => (
  <blockquote className="border-l-4 border-gray-300 pl-3 italic mb-2">
   {children}
  </blockquote>
 ),
 strong: ({ children }) => <strong className="font-bold">{children}</strong>,
 em: ({ children }) => <em className="italic">{children}</em>,
};

export default function MessageBubble({ message }: MessageBubbleProps) {
 const isUser = message.role === "user";

 return (
  <div
   className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 sm:mb-4`}
  >
   <div
    className={`max-w-[85%] sm:max-w-[80%] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 ${
     isUser
      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-2 sm:ml-4"
      : "bg-gray-100 text-gray-800 mr-2 sm:mr-4"
    }`}
   >
    <div className="flex items-start space-x-1.5 sm:space-x-2">
     {!isUser && (
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
       <LightningIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
      </div>
     )}
     <div className="leading-relaxed text-sm sm:text-base flex-1 min-w-0">
      {isUser ? (
       <div className="whitespace-pre-wrap">{message.content}</div>
      ) : (
       <div className="prose prose-sm sm:prose-base max-w-none prose-gray">
        <ReactMarkdown
         remarkPlugins={[remarkGfm]}
         components={markdownComponents}
        >
         {message.content}
        </ReactMarkdown>
       </div>
      )}
     </div>
     {isUser && (
      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
       <UserIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
      </div>
     )}
    </div>
   </div>
  </div>
 );
}
```

- Styling a modern chat UI with Tailwind CSS

### Continued development

Future enhancements for this project could include:

- Adding theme options
- Supporting different AI models
- Implementing code syntax highlighting
- Adding user authentication
- Implementing conversation history

### Useful resources

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs) - Comprehensive guide to using the Vercel AI SDK
- [A Practical Guide to Using the Vercel AI SDK in Next.js Applications](https://www.telerik.com/blogs/practical-guide-using-vercel-ai-sdk-next-js-applications) - Excellent tutorial on implementing AI features with Next.js

## Author

- Github - [@snigdha-sukun](https://github.com/snigdha-sukun)
