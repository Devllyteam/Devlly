import { Button } from "@/components/ui/button";

import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StackedCircularFooter() {
  return (
    <footer className="bg-background py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-primary/10 p-8">
            <Image src="/devlly.svg" width={40} height={40} alt="Devlly" />
          </div>
          <nav className="mb-8 flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Policy
            </Link>
          </nav>
          <div className="mb-8 flex space-x-4">
            <Link href="https://x.com/arihantCodes">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <Link href="https://github.com/arihantcodes">
              <Button variant="outline" size="icon" className="rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/arihantcodes">
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Devlly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
