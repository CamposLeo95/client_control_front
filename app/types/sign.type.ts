import { IClient } from "./client.type";
import { IService } from "./services.type";

export type ISign = {
  id: number;
  activeSign: boolean;
  expireDate: [number, number, number];
  client: IClient;
  serviceOffering: IService;
}

export type ISignToPayment = {
  id: number;
  activeSign: boolean;
  expireDate: [number, number, number];
}