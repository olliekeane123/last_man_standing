import NavBar from "./components/NavBar";
import { MatchweekFixtures } from "./components/MatchweekFixtures";

export default function Home() {
  return (
    <div>
        <NavBar/>
        <div className="flex items-center justify-center">
            <MatchweekFixtures />
        </div>
    </div>
  );
}
