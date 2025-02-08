
import Link from 'next/link';
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return (
    <header className="flex items-center justify-center space-x-8 py-12 pl-7 ml-60 font-semibold">
      <nav className="flex space-x-8">
       
        <Link className="hover:text-primary" href="/">
          HOME
        </Link>
        <Link className="hover:text-primary" href="/about">
          ABOUT US
        </Link>
        <Link className="hover:text-primary" href="/students">
          FOR STUDENTS
        </Link>
        <Link className="hover:text-primary" href="/companies">
          FOR COMPANIES
        </Link>
      </nav>
      <div className="ml-auto pr-8">
        <Button className="bg-primary text-foreground px-6 py-2 rounded-full">Contact Now</Button>
      </div>
    </header>
  );
}