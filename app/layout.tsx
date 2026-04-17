import type { Metadata } from "next";
import PremiumHeader from "./components/premium-header/PremiumHeader";
import { Providers } from "./components/providers";
import "./globals.css";
import { BackgroundHexagons } from "./components/global/BackgroundHexagons";

export const metadata: Metadata = {
  title: "Kinshasa Mall",
  description: "Welcome to the best shopping center in town — retail, dining, and community in one destination.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full font-sans antialiased"
    >
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/knn2tsv.css" />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <BackgroundHexagons />
          <PremiumHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
