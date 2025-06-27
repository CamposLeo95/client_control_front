
type ISign = {
  id: number;
  activeSign: boolean;
  expireDate: [number, number, number];
  client: {
    id: number;
    name: string;
    email: string;
    login: string;
    password: string;
    phone: string;
  };
  serviceOffering: { id: number; name: string; price: number };
}