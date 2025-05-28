import type { Components } from "react-markdown";

// Define markdown components to be used with ReactMarkdown
export const markdownComponents: Components = {
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
