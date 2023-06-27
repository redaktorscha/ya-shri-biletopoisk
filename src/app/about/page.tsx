import { MainContent } from "@/components/MainContent/MainContent";
import { AboutUS } from "@/components/AboutUs/AboutUs";

export default function AboutPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <AboutUS />
    </MainContent>
  );
}