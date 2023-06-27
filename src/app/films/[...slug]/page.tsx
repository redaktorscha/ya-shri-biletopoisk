import { MainContent } from "@/components/MainContent/MainContent";
import { Film } from "@/components/Film/Film";

export default function FilmPage() {
  return (
    <MainContent hasAsideBlock={false}>
      <Film />
    </MainContent>
  );
}