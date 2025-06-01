export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  timestamp: string;
};
