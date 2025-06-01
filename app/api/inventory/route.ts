import { NextResponse } from 'next/server';
import { InventoryItem, InventoryResponse } from '@/app/types/inventory';

const inventory: InventoryItem[] = [
  {
    productId: 1,
    name: "スマートフォン X",
    currentStock: 50,
    reservedStock: 5,
    availableStock: 45,
    lastUpdated: new Date().toISOString()
  },
  {
    productId: 2,
    name: "ワイヤレスイヤホン",
    currentStock: 100,
    reservedStock: 10,
    availableStock: 90,
    lastUpdated: new Date().toISOString()
  },
  {
    productId: 3,
    name: "スマートウォッチ",
    currentStock: 30,
    reservedStock: 3,
    availableStock: 27,
    lastUpdated: new Date().toISOString()
  }
];

export async function GET(): Promise<NextResponse<InventoryResponse>> {
  return NextResponse.json({
    items: inventory,
    total: inventory.length,
    timestamp: new Date().toISOString()
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { productId, quantity } = body;

  const updatedInventory = inventory.map(item => {
    if (item.productId === productId) {
      return {
        ...item,
        currentStock: item.currentStock - quantity,
        availableStock: item.availableStock - quantity,
        lastUpdated: new Date().toISOString()
      };
    }
    return item;
  });

  return NextResponse.json({
    message: "在庫が更新されました",
    inventory: updatedInventory,
    timestamp: new Date().toISOString()
  });
} 