import { NextResponse } from 'next/server';

const cart = {
  id: "cart_123",
  items: [
    {
      productId: 1,
      name: "スマートフォン X",
      price: 89800,
      quantity: 1,
      image: "/images/Gemini_Generated_Image_7bfn17bfn17bfn17.png"
    },
    {
      productId: 2,
      name: "ワイヤレスイヤホン",
      price: 19800,
      quantity: 2,
      image: "/images/Gemini_Generated_Image_5tyqmm5tyqmm5tyq.png"
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

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { error: '商品IDが指定されていません' },
      { status: 400 }
    );
  }

  const updatedItems = cart.items.filter(item => item.productId !== Number(productId));
  cart.items = updatedItems;
  cart.subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cart.tax = Math.floor(updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1);
  cart.total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + cart.shipping + Math.floor(updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1);

  return new NextResponse(null, { status: 204 });
} 