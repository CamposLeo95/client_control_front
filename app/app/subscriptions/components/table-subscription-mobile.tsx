import { ISign } from "@/app/types/sign.type";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FilterTable from "./filter-table";

import CardsSubscriptionMobile from "./card-subscription-mobile";
import { PaginationTableSubscription } from "./pagination-subscription";


interface PaginationProps {
  subscriptions: ISign[];
  page: string | number;
}

export default function TableSubscriptionMobile({ subscriptions, page }: PaginationProps) {
  return (
    <div className="w-full px-4 block md:hidden">
      <div className="flex items-center justify-end w-full mt-4">
        

        <FilterTable />
      </div>

      <Separator className="my-4" />

      <div className="min-h-[400px] space-y-3">
        {subscriptions.length === 0 ? (
          <div className="flex items-center justify-center h-96 flex-col gap-4">
            <Image src="/error-404.png" alt="Nenhuma assinatura" width={80} height={80} />
            <span className="text-gray-500 font-semibold">Nenhuma assinatura encontrada!</span>
          </div>
        ) : (
          subscriptions.map((subscription) => (
            <CardsSubscriptionMobile key={subscription.id} subscription={subscription} />
          ))
        )}
      </div>

      <div className="mt-6">
        <PaginationTableSubscription page={page} />
      </div>
    </div>
  );
}
