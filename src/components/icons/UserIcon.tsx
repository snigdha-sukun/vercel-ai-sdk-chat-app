interface IconProps {
	className?: string;
}

export default function UserIcon({ className = "w-3 h-3" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 20 20">
			<title>User Icon</title>
			<path
				fillRule="evenodd"
				d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
