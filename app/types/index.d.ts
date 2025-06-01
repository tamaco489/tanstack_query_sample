// 環境変数の型定義
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}

// グローバルな型定義
declare type Status = 'success' | 'error' | 'loading' | 'idle';

declare interface ApiResponse<T> {
  data: T;
  status: Status;
  error?: string;
  timestamp: string;
}

// 共通の型定義
declare interface BaseEntity {
  id: string | number;
  createdAt: string;
  updatedAt: string;
}

// ページネーション関連の型定義
declare interface PaginationParams {
  page: number;
  limit: number;
}

declare interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// エラーレスポンスの型定義
declare interface ErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// 認証関連の型定義
declare interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

declare interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// 通知関連の型定義
declare type NotificationType = 'success' | 'error' | 'warning' | 'info';

declare interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

// モーダル関連の型定義
declare interface ModalState {
  isOpen: boolean;
  type: string;
  data?: unknown;
}

// フォーム関連の型定義
declare interface FormState {
  isDirty: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// 検索関連の型定義
declare interface SearchParams {
  query: string;
  filters?: Record<string, unknown>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

// ファイル関連の型定義
declare interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  progress?: number;
}

// 日付関連の型定義
declare type DateRange = {
  start: string;
  end: string;
};

// 通貨関連の型定義
declare type Currency = 'JPY' | 'USD' | 'EUR';

declare interface Money {
  amount: number;
  currency: Currency;
}

// ロケール関連の型定義
declare type Locale = 'ja' | 'en';

declare interface LocalizedString {
  ja: string;
  en: string;
}

// メタデータ関連の型定義
declare interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

// 設定関連の型定義
declare interface AppConfig {
  theme: 'light' | 'dark';
  language: Locale;
  currency: Currency;
  notifications: boolean;
}

// イベント関連の型定義
declare interface Event {
  type: string;
  payload: unknown;
  timestamp: string;
}

// ログ関連の型定義
declare interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
} 