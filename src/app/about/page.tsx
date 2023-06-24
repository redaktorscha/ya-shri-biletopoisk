import { MainContent } from "@/components/MainContent/MainContent";
import { AboutUS } from "@/components/AboutUs/AboutUs";
// import { Tickets } from "@/components/Ticket/Ticket";
// import { Card } from "@/components/Card/Card";
// import { Checkout } from "@/components/Checkout/Checkout";
// import { Film } from "@/components/Film/Film";
// import { QABlock } from "@/components/QA/QABlock";

export default function AboutPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <AboutUS />
    </MainContent>
  );
}