// A tiny stand-in for a real product API.
// In a real project these functions would call your REST or GraphQL service.

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

const products: Product[] = [
  { id: "p-100", name: "Mechanical Keyboard", category: "accessories", price: 89.9, inStock: true },
  { id: "p-101", name: "Wireless Mouse", category: "accessories", price: 29.5, inStock: true },
  { id: "p-102", name: "27\" 4K Monitor", category: "displays", price: 329.0, inStock: false },
  { id: "p-103", name: "USB-C Dock", category: "accessories", price: 119.0, inStock: true },
  { id: "p-104", name: "Noise-Cancelling Headphones", category: "audio", price: 199.0, inStock: true },
];

export async function listProducts(category?: string): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : products;
}

export async function getProduct(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function searchProducts(query: string, maxPrice?: number): Promise<Product[]> {
  const q = query.toLowerCase();
  return products.filter(
    (p) => p.name.toLowerCase().includes(q) && (maxPrice === undefined || p.price <= maxPrice),
  );
}
