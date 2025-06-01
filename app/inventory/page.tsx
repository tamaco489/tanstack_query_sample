'use client';

import { useQuery } from '@tanstack/react-query';
import { InventoryItem, InventoryResponse } from '@/app/types/inventory';

async function fetchInventory(): Promise<InventoryItem[]> {
  const response = await fetch('/api/inventory');
  const data: InventoryResponse = await response.json();
  return data.items;
}

export default function InventoryPage() {
  const { data: inventory, isLoading, error } = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  });

  if (isLoading) {
    return <div className="p-4">読み込み中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">エラーが発生しました</div>;
  }

  const getStockStatus = (availableStock: number) => {
    if (availableStock <= 0) {
      return 'text-red-600';
    } else if (availableStock < 10) {
      return 'text-yellow-600';
    }
    return 'text-green-600';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">在庫管理</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                商品名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                現在の在庫
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                予約在庫
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                利用可能在庫
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最終更新日
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory?.map((item: InventoryItem) => (
              <tr key={item.productId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.currentStock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.reservedStock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getStockStatus(item.availableStock)}`}>
                    {item.availableStock}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleString('ja-JP')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {
                      // 在庫更新処理を実装
                    }}
                  >
                    在庫更新
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 