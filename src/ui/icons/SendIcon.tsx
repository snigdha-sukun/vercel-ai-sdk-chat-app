import type { IconProps } from "./types";

export function SendIcon({
	className = "w-4 h-4",
	title = "Send Icon",
}: Readonly<IconProps>) {
	return (
		<svg
			className={className}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			role="img"
			aria-labelledby="sendIconTitle"
		>
			<title id="sendIconTitle">{title || "Send Icon"}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
			/>
		</svg>
	);
}
