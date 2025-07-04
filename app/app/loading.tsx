import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-indigo-500 font-semibold text-xl animate-puls flex items-center">
        <Loader className="mr-2 animate-spin" /> <span>Carregando...</span>
      </div>
    </div>
  );
}