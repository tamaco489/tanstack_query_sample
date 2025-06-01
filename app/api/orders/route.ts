import { NextResponse } from 'next/server';

const orders = [
  {
    id: "order_001",
    date: "2024-03-01T10:00:00Z",
    status: "completed",
    items: [
      {
        productId: 1,
        name: "スマートフォン X",
        price: 89800,
        quantity: 1
      }
    ],
    total: 89800,
    shippingAddress: {
      name: "山田 太郎",
      postalCode: "123-4567",
      address: "東京都渋谷区..."
    }
  },
  {
    id: "order_002",
    date: "2024-03-15T15:30:00Z",
    status: "shipped",
    items: [
      {
        productId: 2,
        name: "ワイヤレスイヤホン",
        price: 19800,
        quantity: 2
      }
    ],
    total: 39600,
    shippingAddress: {
      name: "山田 太郎",
      postalCode: "123-4567",
      address: "東京都渋谷区..."
    }
  }
];

export async function GET() {
  return NextResponse.json({
    orders,
    total: orders.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newOrder = {
    id: `order_${String(orders.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString(),
    status: "pending",
    ...body
  };

  return NextResponse.json({
    message: "注文が作成されました",
    order: newOrder,
    timestamp: new Date().toISOString()
  });
} 