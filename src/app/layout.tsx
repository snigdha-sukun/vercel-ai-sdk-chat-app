import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const roboto = Roboto({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-roboto",
	display: "swap",
});

export const metadata: Metadata = {
	title: "AI Chat Assistant",
	description:
		"AI Chat Application using Vercel AI SDK and Gemini 2.0 Flash EXP model",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${roboto.variable} font-sans antialiased min-h-screen`}>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
