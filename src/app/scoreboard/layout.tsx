import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scoreboard",
  description: "Matches scoreboard & boxscore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="size-full">
      {children}
    </div>
  );
}
