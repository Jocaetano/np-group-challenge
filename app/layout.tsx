import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Library — Northstar",
  description:
    "Explore the metrics, visuals, layouts, and stories behind better decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('northstar-theme');document.documentElement.classList.toggle('dark',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
