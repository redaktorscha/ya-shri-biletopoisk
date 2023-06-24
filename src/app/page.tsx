// import Image from 'next/image'
// "use client";
import styles from "./page.module.css";
import { MainContent } from "@/components/MainContent/MainContent";
// import { AboutUS } from "@/components/AboutUs/AboutUs";
import { TicketSelection } from "@/components/TicketSelection/TicketSelection";
// import { Card } from "@/components/Card/Card";
// import { Checkout } from "@/components/Checkout/Checkout";
// import { Film } from "@/components/Film/Film";
// import { QABlock } from "@/components/QA/QABlock";

export default function HomePage() {
  return (
    <MainContent hasAsideBlock>
      <TicketSelection />
    </MainContent>
  );
}
