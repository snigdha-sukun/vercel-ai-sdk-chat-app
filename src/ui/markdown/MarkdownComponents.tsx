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
	p: ({ children }) => <p className="mb-2 mt-0 last:mb-0">{children}</p>,
	ul: ({ children }) => (
		<ul className="list-disc pl-4 mb-2 mt-0">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal pl-4 mb-2 mt-0">{children}</ol>
	),
	li: ({ children }) => <li className="mb-1 last:mb-0">{children}</li>,
	a: ({ href, children }) => (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="text-blue-600 dark:text-blue-400 hover:underline"
		>
			{children}
		</a>
	),
	// Fixed code component to use proper typing for react-markdown
	code: (props) => {
		const { children } = props;

		// React-markdown already handles inline vs block code
		// We'll use a simplified approach that doesn't rely on node.parent
		const match = /language-(\w+)/.exec(props.className ?? "");
		const language = match?.[1] ?? "";

		if (!language) {
			return (
				<code className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-1 py-0.5 text-xs sm:text-sm">
					{children}
				</code>
			);
		}

		return (
			<pre className="bg-gray-200 dark:bg-gray-700 rounded p-2 mb-2 mt-0 overflow-x-auto">
				<code
					className={`text-xs sm:text-sm text-gray-800 dark:text-gray-200 language-${language}`}
				>
					{children}
				</code>
			</pre>
		);
	},
	blockquote: ({ children }) => (
		<blockquote className="border-l-2 border-gray-400 dark:border-gray-500 pl-2 italic my-2">
			{children}
		</blockquote>
	),
	table: ({ children }) => (
		<div className="overflow-x-auto mb-2 mt-0">
			<table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
				{children}
			</table>
		</div>
	),
	thead: ({ children }) => (
		<thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
	),
	tbody: ({ children }) => (
		<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
			{children}
		</tbody>
	),
	tr: ({ children }) => <tr>{children}</tr>,
	th: ({ children }) => (
		<th
			scope="col"
			className="px-3 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300"
		>
			{children}
		</th>
	),
	td: ({ children }) => (
		<td className="px-3 py-2 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
			{children}
		</td>
	),
};
