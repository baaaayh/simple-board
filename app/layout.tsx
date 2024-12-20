import type { Metadata } from "next";
import "./globals.scss";
import "@/app/lib/fonts";

export const metadata: Metadata = {
    title: "SIMPLE BOARD",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
