import Link from "next/link";
import { Button } from "@/components/ui/button";
import EchoPlanLogo from "@/public/echoplan-logo";

interface HeaderProps {
  showNav?: boolean;
  hideCTA?: boolean;
}

export default function Header({
  showNav = false,
  hideCTA = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <EchoPlanLogo />
        </Link>

        {/* Navigation Links */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="/demo"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Demo
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
          </nav>
        )}

        {/* Call to Action Buttons */}
        {!hideCTA && (
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
