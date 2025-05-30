import type { IconProps } from "./types";

export function SunIcon({
	className = "",
	title = "Sun Icon",
}: Readonly<IconProps>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			role="img"
			aria-labelledby="sunIconTitle"
		>
			<title id="sunIconTitle">{title || "Sun Icon"}</title>
			<circle cx="12" cy="12" r="4" fill="currentColor" />
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				stroke="currentColor"
				d="M12 3v2M12 19v2M3 12h2M19 12h2M5.636 5.636l1.414 1.414M16.95 16.95l1.414 1.414M5.636 18.364l1.414-1.414M16.95 7.05l1.414-1.414"
			/>
		</svg>
	);
}
