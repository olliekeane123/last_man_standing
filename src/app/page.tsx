import Header from "./components/Header";
import { MatchweekFixtures } from "./components/MatchweekFixtures";

export default function Home() {
  return (
    <div>
        <Header/>
        <div className="flex items-center justify-center">
            <MatchweekFixtures />
        </div>
    </div>
  );
}
