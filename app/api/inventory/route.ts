import { NextResponse } from 'next/server';

const inventory = [
  {
    productId: 1,
    name: "スマートフォン X",
    currentStock: 50,
    reservedStock: 5,
    availableStock: 45,
    lastUpdated: "2024-03-20T09:00:00Z"
  },
  {
    productId: 2,
    name: "ワイヤレスイヤホン",
    currentStock: 100,
    reservedStock: 20,
    availableStock: 80,
    lastUpdated: "2024-03-20T09:00:00Z"
  },
  {
    productId: 3,
    name: "スマートウォッチ",
    currentStock: 30,
    reservedStock: 10,
    availableStock: 20,
    lastUpdated: "2024-03-20T09:00:00Z"
  }
];

export async function GET() {
  return NextResponse.json({
    inventory,
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