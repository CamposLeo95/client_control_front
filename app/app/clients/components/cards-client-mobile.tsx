import { IClient } from "@/app/types/client.type";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle2 } from "lucide-react";
import Link from "next/link";

interface ICardsClientMobileProps {
  client: IClient;
}

export default function CardsClientMobile({ client }: ICardsClientMobileProps) {
  return (
    <Link href={`/app/clients/${client.id}`} passHref>
      <Card className="rounded-lg shadow-sm transition hover:shadow-md hover:bg-zinc-900 cursor-pointer mb-2">
        <CardContent className="flex items-center gap-4">
          <UserCircle2 size={36} className="text-indigo-500 shrink-0" strokeWidth={1.5} />

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">{client.name}</p>
            <p className="text-sm text-zinc-400 truncate">{client.email}</p>
          </div>

          {client.createdAt && (
            <p className="text-xs text-zinc-500 text-right italic whitespace-nowrap min-w-[70px]">
              {formatterDateAPI(client.createdAt)}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
