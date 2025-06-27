import { Link } from "lucide-react";

export default function NavBarApp() {
  return (
    <nav className=" bg-white text-zinc-900 p-2">
      <div className="">
        <ul className="flex space-x-4">
          <li>
            <Link href="/app/dashboard" >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}