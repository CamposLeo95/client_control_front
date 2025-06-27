import { BadgeDollarSign, DollarSignIcon, File, Handshake, LayoutDashboard, Settings, User } from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="w-48 h-full bg-zinc-800 text-white p-4 fixed top-0 left-0  flex-col items-center shadow-md">
      <h2 className="text-xl font-bold my-3 "><Settings /></h2>
      <ul className="space-y-10 px-2  flex flex-col  mt-10">
        <li><Link href="/app/dashboard" className=" flex gap-3 w-full items-center px-2 "><LayoutDashboard/><span>Dashboard</span></Link></li>
        <li><Link href="/app/clients" className=" flex gap-3 w-full items-center px-2 "><User/><span>Clientes</span></Link></li>
        <li><Link href="/app/signs" className=" flex gap-3 w-full  items-center p-2 "><File/><span>Assinaturas</span></Link></li>
        <li><Link href="/app/payments" className=" flex gap-3 w-full  items-center p-2 "><BadgeDollarSign/><span>Pagamentos</span></Link></li>
        <li><Link href="/app/services" className=" flex gap-3 w-full  items-center p-2 "><Handshake/><span>Serviços</span></Link></li>
      </ul>
    </div>
  );
}