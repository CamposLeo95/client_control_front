import { IPayment } from "@/app/types/payment";
import { formatterDateAPI } from "@/app/utils/formatter-date";
import formatterPrice from "@/app/utils/formmatter-price";
import { Card } from "@/components/ui/card";
import { CircleDollarSignIcon, MoveUp } from "lucide-react";
import Link from "next/link";

interface ICardsPaymentMobileProps {
  payment: IPayment;
}

export default function CardsPaymentMobile({ payment }: ICardsPaymentMobileProps) {

  return (
    <Link href={`/app/payments/${payment.id}`} passHref>
      <Card className=" rounded-lg shadow-sm p-4 mb-2 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <CircleDollarSignIcon className="text-indigo-500" size={36} strokeWidth={1.5} />

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">{payment.client.name}</p>
            <p className="text-sm text-zinc-500 truncate">{payment.client.email}</p>
            <p className="text-sm  truncate text-green-600 font-semibold flex items-center"><MoveUp className="size-3" /> {formatterPrice(payment.value)}</p>
          </div>

          {payment.createdAt && (
            <p className="text-xs text-zinc-500 italic min-w-[80px] text-right">
              {formatterDateAPI(payment.createdAt)}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
