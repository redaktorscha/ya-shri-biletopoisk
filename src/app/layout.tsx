import "./globals.css";
import { Roboto } from "next/font/google";
import { SvgSprite } from "@/components/SVGSprite/SVGSprite";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { MainSection } from "@/components/MainSection/MainSection";


const fontRoboto = Roboto({
  weight: ["700", "500", "400"],
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
      <body className={fontRoboto.className}>
        <div className="wrapper">
          <Header />
          <SvgSprite />
          <MainSection>{children}</MainSection>
          <Footer />
        </div>
      </body>
    </html>
  );
}
