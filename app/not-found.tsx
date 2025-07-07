import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4 text-center">
      <AlertTriangle size={64} className="text-indigo-400 mb-4" />
      <h1 className="text-5xl font-bold mb-2">404</h1>
      <p className="text-lg mb-6">Oops! Pagina não encontrada!</p>
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white font-semibold"
      >
        Voltar para o Início
      </Link>
    </div>
  );
}
