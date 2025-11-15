import "./globals.css";

export const metadata = {
	title: 'User Management System',
	description: 'Fullstack user and profile management application',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
    		<body>{children}</body>
		</html>
	);
}
