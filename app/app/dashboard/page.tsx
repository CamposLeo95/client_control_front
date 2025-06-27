import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cookies } from "next/headers";

export default async function DashboardPage() {


  return (
    <div className="flex bg-zinc-50 flex-col items-center justify-center p-8 gap-8">
      <h1 className="text-2xl font-bold">Dashboard Page</h1>
      <p className="text-lg">Welcome to your dashboard!</p>
      <div className="flex flex-col gap-4 w-full ">
        
      </div>
    </div>
  );
}