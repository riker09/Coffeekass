import { IPurchase } from './i-purchase';

export interface ISale {
  [ key: string ]: unknown;
  id?: string;
  items: IPurchase[];
  createdAt: Date;
}
