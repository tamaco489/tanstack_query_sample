import { NextResponse } from 'next/server';
import { Order, OrderResponse } from '@/app/types/order';

const orders: Order[] = [
  {
    id: 1,
    items: [
      {
        productId: 1,
        name: "スマートフォン X",
        price: 89800,
        quantity: 1,
        image: "/images/Gemini_Generated_Image_7bfn17bfn17bfn17.png"
      }
    ],
    status: "delivered",
    total: 89800,
    shippingAddress: "東京都渋谷区...",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-02T15:00:00Z"
  },
  {
    id: 2,
    items: [
      {
        productId: 2,
        name: "ワイヤレスイヤホン",
        price: 19800,
        quantity: 2,
        image: "/images/Gemini_Generated_Image_5tyqmm5tyqmm5tyq.png"
      }
    ],
    status: "processing",
    total: 39600,
    shippingAddress: "大阪府大阪市...",
    createdAt: "2024-03-15T14:00:00Z",
    updatedAt: "2024-03-15T14:00:00Z"
  }
];

export async function GET(): Promise<NextResponse<OrderResponse>> {
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