import { IPayment } from "@/app/types/payment";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardsPaymentMobile from "./cards-payment-mobile";
import FilterTable from "./filter-table";
import { PaginationTablePayment } from "./pagination-payment";


interface PaginationProps {
  payments: IPayment[];
  page: string | number;
}

export default function TablePaymentsMobile({ payments, page }: PaginationProps) {
  return (
    <div className="w-full px-4 block md:hidden">
      <div className="flex items-center justify-between w-full mt-4">
        <Link
          href="/app/payments/register"
          prefetch={false}
          passHref
          className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center px-4 py-2 rounded-md text-sm"
        >
          <Plus className="mr-1" width={15} />
          <span>Novo Pagamento</span>
        </Link>

        <FilterTable />
      </div>

      <Separator className="my-4" />

      <div className="min-h-[400px] space-y-3">
        {payments.length === 0 ? (
          <div className="flex items-center justify-center h-96 flex-col gap-4">
            <Image src="/error-404.png" alt="Nenhum pagamento" width={80} height={80} />
            <span className="text-gray-500 font-semibold">Nenhum pagamento encontrado!</span>
          </div>
        ) : (
          payments.map((payment) => <CardsPaymentMobile key={payment.id} payment={payment} />)
        )}
      </div>

      <div className="mt-6">
        <PaginationTablePayment page={page} />
      </div>
    </div>
  );
}
