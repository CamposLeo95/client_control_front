import { ISign } from "@/app/types/sign.type";
import { checkDateExpired, formatterDateAPI } from "@/app/utils/formatter-date";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FileArchive, UserCircle2 } from "lucide-react";
import Link from "next/link";

interface ICardsSubscriptionMobileProps {
  subscription: ISign;
}

export default function CardsSubscriptionMobile({ subscription }: ICardsSubscriptionMobileProps) {

  checkDateExpired(subscription.expireDate);

  return (
    <Link href={`/app/subscriptions/${subscription.id}`} passHref>
      <Card className={cn("rounded-lg shadow-sm p-4 transition-colors cursor-pointer mb-3 ")}>
        <div className="flex items-center gap-4">
          <FileArchive  className="text-indigo-500" size={36} strokeWidth={1.5} />

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">{subscription.client.name}</p>
            <p className="text-sm text-zinc-500 truncate">{subscription.client.email}</p>
            <p className="text-sm text-zinc-500 truncate">{subscription.serviceOffering.name}</p>
          </div>

          {subscription.expireDate && (
            <p className={cn("text-xs text-zinc-500 italic min-w-[80px] text-right flex flex-col", checkDateExpired(subscription.expireDate) ? "text-red-500 " : "text-green-500 ")}>
              <span>{`${checkDateExpired(subscription.expireDate) ? "Expirado" : "Expira em:"}`}</span>
              {formatterDateAPI(subscription.expireDate)}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
