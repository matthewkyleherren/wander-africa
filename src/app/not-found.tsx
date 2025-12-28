import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="font-display text-display-lg text-foreground mb-4">
          404
        </h1>
        <p className="text-body-lg text-foreground-muted mb-8">
          Page not found
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
