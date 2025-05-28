interface IconProps {
	className?: string;
}

export default function LightningIcon({ className = "w-3 h-3" }: IconProps) {
	return (
		<svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-labelledby="lightningIconTitle">
			<title id="lightningIconTitle">Lightning Icon</title>
			<path
				fillRule="evenodd"
				d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
