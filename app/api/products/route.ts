import { NextResponse } from 'next/server';

const products = [
  {
    id: 1,
    name: "スマートフォン X",
    price: 89800,
    description: "最新の高性能スマートフォン",
    stock: 50,
    category: "electronics",
    image: "https://example.com/phone.jpg"
  },
  {
    id: 2,
    name: "ワイヤレスイヤホン",
    price: 19800,
    description: "ノイズキャンセリング機能付き",
    stock: 100,
    category: "electronics",
    image: "https://example.com/earphones.jpg"
  },
  {
    id: 3,
    name: "スマートウォッチ",
    price: 29800,
    description: "健康管理機能付き",
    stock: 30,
    category: "electronics",
    image: "https://example.com/watch.jpg"
  }
];

export async function GET() {
  return NextResponse.json({
    products,
    total: products.length,
    timestamp: new Date().toISOString()
  });
} 