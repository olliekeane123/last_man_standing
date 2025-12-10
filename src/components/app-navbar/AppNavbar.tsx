import { Button } from "@/components/ui/button";
// import { Logo } from "./logo";
import { AppNavMenu } from "@/components/app-navbar/AppNavMenu";
import { NavigationSheet } from "@/components/app-navbar/NavigationSheet";
import ModeToggle from "@/components/ModeToggle";
import { Triangle } from "lucide-react";

const AppNavbar = () => {
  return (
    <nav className="h-16 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6">
        <Triangle />

        {/* Desktop Menu */}
        <AppNavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button className="hidden xs:inline-flex">Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;