import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface ICardsClientMobileProps {
  client: IClient;
}

export default function CardsClientMobile({ client }: ICardsClientMobileProps) {
  return (
    <Link href={`/app/clients/${client.id}`}>
      <div className="mt-3 w-full rounded-xl bg-white shadow-md p-4 hover:bg-zinc-50 transition-colors duration-200 cursor-pointer flex items-center gap-4">
        <div className="text-indigo-600">
          <UserCircle2 size={40} strokeWidth={1.5} />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-zinc-900">{client.name}</p>
          <p className="text-sm text-zinc-500">{client.email}</p>
        </div>

        {client.createdAt && (
          <div className="text-xs text-zinc-400 italic text-right min-w-[80px]">
            {formatterDateAPI(client.createdAt)}
          </div>
        )}
      </div>
    </Link>
  );
}
