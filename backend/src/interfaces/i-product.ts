export interface IProduct {
  id: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  inventoryStatus?: InventoryStatusType;
}

export type InventoryStatusType = 'instock' | 'lowstock' | 'outofstock';