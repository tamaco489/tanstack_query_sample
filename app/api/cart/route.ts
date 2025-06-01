import { NextResponse } from 'next/server';

const cart = {
  id: "cart_123",
  items: [
    {
      productId: 1,
      name: "スマートフォン X",
      price: 89800,
      quantity: 1,
      image: "https://example.com/phone.jpg"
    },
    {
      productId: 2,
      name: "ワイヤレスイヤホン",
      price: 19800,
      quantity: 2,
      image: "https://example.com/earphones.jpg"
    }
  ],
  subtotal: 129400,
  shipping: 800,
  tax: 12940,
  total: 143140
};

export async function GET() {
  return NextResponse.json({
    cart,
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message: "カートが更新されました",
    cart: {
      ...cart,
      items: [...cart.items, body]
    },
    timestamp: new Date().toISOString()
  });
} 