import { IClient } from "./client.type";
import { IService } from "./services.type";

export type ISign = {
  id: number;
  activeSign: boolean;
  expireDate: [number, number, number];
  client: IClient;
  serviceOffering: IService;
  description: string;
}

export type ISignToPayment = {
  id: number;
  activeSign: boolean;
  expireDate: [number, number, number];
}