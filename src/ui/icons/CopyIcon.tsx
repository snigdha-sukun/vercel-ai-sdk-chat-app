import type { IconProps } from "./types";

export function CopyIcon({
	className = "w-3 h-3",
	title = "Copy Icon",
}: Readonly<IconProps>) {
	return (
		<svg
			className={className}
			fill="currentColor"
			viewBox="0 0 20 20"
			aria-hidden="true"
		>
			<title id="copyIconTitle">{title || "Copy Icon"}</title>
			<path
				fillRule="evenodd"
				d="M8 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-3.5a1 1 0 00-2 0V15a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5h3v2a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-.293-.707l-3-3A1 1 0 008.586 0H8v1zm0 1h.586L12 6.414V8H8V3z"
				clipRule="evenodd"
			/>
			<path
				fillRule="evenodd"
				d="M12 3h-1v1h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1h1V2H5a2 2 0 00-2 2v8a2 2 0 002 2h7a2 2 0 002-2V5a2 2 0 00-2-2z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
