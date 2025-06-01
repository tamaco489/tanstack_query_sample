import { NextResponse } from 'next/server';
import { Product, ProductResponse } from '@/app/types/product';

const products: Product[] = [
  {
    id: 1,
    name: "スマートフォン X",
    price: 89800,
    description: "最新の高性能スマートフォン",
    stock: 50,
    category: "electronics",
    image: "/images/Gemini_Generated_Image_7bfn17bfn17bfn17.png"
  },
  {
    id: 2,
    name: "ワイヤレスイヤホン",
    price: 19800,
    description: "ノイズキャンセリング機能付き",
    stock: 100,
    category: "electronics",
    image: "/images/Gemini_Generated_Image_5tyqmm5tyqmm5tyq.png"
  },
  {
    id: 3,
    name: "スマートウォッチ",
    price: 29800,
    description: "健康管理機能付き",
    stock: 30,
    category: "electronics",
    image: "/images/Gemini_Generated_Image_gbrsk2gbrsk2gbrs.png"
  }
];

export async function GET(): Promise<NextResponse<ProductResponse>> {
  return NextResponse.json({
    products,
    total: products.length,
    timestamp: new Date().toISOString()
  });
} 