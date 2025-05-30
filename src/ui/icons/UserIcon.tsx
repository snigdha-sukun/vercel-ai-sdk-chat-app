import type { IconProps } from "./types";

export function UserIcon({
	className = "w-3 h-3",
	title = "User Icon",
}: Readonly<IconProps>) {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			role="img"
			aria-labelledby="userIconTitle"
		>
			<title id="userIconTitle">{title || "User Icon"}</title>
			<path
				fillRule="evenodd"
				d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
