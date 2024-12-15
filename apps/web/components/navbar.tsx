import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ModeToggle } from "./moon"

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
         <Image src="/devlly.svg" width={40} height={40} alt="Devlly" />
          <span className="font-bold text-xl">Devlly</span>
        </Link>
        <div className="flex gap-6 text-sm font-medium ">
          <Link href="/scroll" className="">
            Scroll
          </Link>
          <Link href="/gig" className="">
            GIG
          </Link>
          <Link href="/spotlight" className="">
          Pitchroom
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5 ml-4">
        <Button variant="outline">Log in</Button>
        <Button className="">Create Profile</Button>
        <ModeToggle/>
      </div>
    </nav>
  )
}

