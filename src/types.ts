export type Screen = "standby" | "loading" | "packing" | "dispatch";

export interface Location {
  zone: string;
  aisle: number;
  shelf: string;
  bin: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  image?: string;
}

export interface LineItem {
  id: string;
  product: Product;
  location: Location;
  quantityRequired: number;
  quantityPacked: number;
  isFullyPacked: boolean;
  weight?: string;
  hasException?: boolean;
}

export interface Order {
  id: string;
  priority: "STANDARD" | "NEXT_DAY" | "URGENT";
  status: "PENDING" | "PACKING" | "PACKED";
  items: LineItem[];
}

export type ExceptionType =
  | "MISSING"
  | "DAMAGED"
  | "WRONG ITEM"
  | "BARCODE UNREADABLE";
