import { IClient } from "./client.type";
import { ISignToPayment } from "./sign.type";

export type IPayment = {
        id: string;
        value: number;
        description: string;
        client: IClient
        sign: ISignToPayment
        createdAt?: number[];
}