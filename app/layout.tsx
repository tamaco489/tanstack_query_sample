import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Link from "next/link";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECサイト",
  description: "Next.jsで作成したECサイトのデモ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
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
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                    >
                      商品一覧
                    </Link>
                    <Link
                      href="/carts"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      カート
                    </Link>
                    <Link
                      href="/orders"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      注文履歴
                    </Link>
                    <Link
                      href="/inventory"
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      在庫管理
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
