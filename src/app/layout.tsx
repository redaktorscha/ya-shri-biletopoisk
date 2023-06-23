
import "./globals.css";
import { Roboto } from "next/font/google";

const fontRoboto = Roboto({
  weight: ["700", "400"],
  style: ["normal"],
  subsets: ["cyrillic"],
});

export const metadata = {
  title: "Билетопоиск",
  description: "Поиск и покупка билетов в кино",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontRoboto.className}>{children}</body>
    </html>
  );
}
