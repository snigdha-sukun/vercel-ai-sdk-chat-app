/**
 * Utility function to conditionally join Tailwind CSS class names together
 */
export function cn(
	...classes: (string | boolean | undefined | null)[]
): string {
	return classes.filter(Boolean).join(" ");
}
