import { Order, Product } from "../types";
import { WAREHOUSE_PRODUCTS } from "../constants";

const PRIORITIES = ["STANDARD", "NEXT_DAY", "URGENT"] as const;
const ZONES = ["A", "B", "C", "D", "Z"] as const;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildLineItem(product: Product, index: number) {
  const quantityRequired = Math.floor(Math.random() * 3) + 1;
  return {
    id: `item_${index + 1}`,
    product,
    location: {
      zone: pickRandom(ZONES),
      aisle: Math.floor(Math.random() * 5) + 1,
      shelf: String(Math.floor(Math.random() * 4) + 1),
      bin: Math.floor(Math.random() * 10) + 1,
    },
    quantityRequired,
    quantityPacked: 0,
    isFullyPacked: false,
    weight: (Math.random() * 2 + 0.1).toFixed(1) + "KG",
  };
}

export function generateOrder(status: Order["status"] = "PACKING"): Order {
  const id = "ORD-" + (Math.floor(Math.random() * 9000) + 1000);
  const priority = pickRandom(PRIORITIES);
  const itemCount = Math.floor(Math.random() * 4) + 2;
  const products = shuffle(WAREHOUSE_PRODUCTS).slice(0, itemCount);

  const lineItems = products.map(buildLineItem);
  const itemIds = lineItems.map((item) => item.id);
  const items = Object.fromEntries(lineItems.map((item) => [item.id, item]));

  return {
    id,
    priority,
    status,
    items,
    itemIds,
  };
}
