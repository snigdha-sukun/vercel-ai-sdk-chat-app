import { ChatIcon } from "@/components/icons";

interface EmptyStateProps {
	readonly className?: string;
}

export default function EmptyState({ className = "" }: EmptyStateProps) {
	return (
		<div
			className={`flex flex-col items-center justify-center h-full text-gray-500 px-4 ${className}`}
		>
			<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
				<ChatIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
			</div>
			<h3 className="text-lg sm:text-xl font-semibold mb-2">
				Start a conversation
			</h3>
			<p className="text-center text-sm sm:text-base">
				Ask me anything! I&apos;m here to help.
			</p>
		</div>
	);
}
