'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900';
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                ECサイト
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/products"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/products')}`}
              >
                商品一覧
              </Link>
              <Link
                href="/carts"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/carts')}`}
              >
                カート
              </Link>
              <Link
                href="/orders"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/orders')}`}
              >
                注文履歴
              </Link>
              <Link
                href="/inventory"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${isActive('/inventory')}`}
              >
                在庫管理
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 