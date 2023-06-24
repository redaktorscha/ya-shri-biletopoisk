import { MainContent } from "@/components/MainContent/MainContent";

// import { Tickets } from "@/components/Ticket/Ticket";
// import { Card } from "@/components/Card/Card";
// import { Checkout } from "@/components/Checkout/Checkout";
import { Film } from "@/components/Film/Film";

export default function FilmPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <Film />
    </MainContent>
  );
}