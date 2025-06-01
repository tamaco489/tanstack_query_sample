export type InventoryItem = {
  productId: number;
  name: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lastUpdated: string;
};

export type InventoryResponse = {
  items: InventoryItem[];
  total: number;
  timestamp: string;
};
