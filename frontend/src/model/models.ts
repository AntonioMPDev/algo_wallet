export interface User {
  _id: any;
  username: string;
  email: string;
}


export interface Transaction {
  _id: string;
  txId: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}