import { Order, Product } from "./types";

export const STATION_ID = "STATION_04";

export const WAREHOUSE_PRODUCTS: Product[] = [
  {
    id: "p_1",
    sku: "MS-WL-099",
    name: "Wireless Mouse",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6x6mgnt8diKRFbcHoxv0VLYW1KhEBfi1Qd6l_HpjdO1M6wQqbqgDGytoPQhIfi5FCCeyBYwshfSs9PGsCsE0TpRUUokZJdCPARIf1rDU4VuMdB9OT4w9RdIVZr09K7ytGuWOfV-pjqdLtcoQnwvBqXteURlQikqj_KWD-aQW1vrhBTZB_Cfw07JfU7datxV4aolTwwYtesooYyR0ZgY0pNxjc3fYX7tftZqRlsvnLoGAyYK8LHkGdkNhpnBbFitMwJ20v4dienQo",
  },
  {
    id: "p_2",
    sku: "KB-MC-044",
    name: "Mechanical Keyboard",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDe5mcmDdZd61AbmR-apI_xxZXLAB7ixN3eICOp4HpWL3ijOadJ1718fzvVVal13R9LsjNmpfaD8voGujKqWipMHdCU3YYabIGKr6GkP_lXOBFWAMn_k5TKhpw6zzXt3CksJ3tzYhrubbCW8z6EfkJSAWdh2pgVreb23hDRwx4dAgmdgk0fFFfHW0efdpHJ64yC92Eb0sC-GvaA90RSNmtP1qrS4vSt02HKUmawPAWO-RVRuIsdA10QK1415vIqal7iRM-N7TaAda4",
  },
  {
    id: "p_3",
    sku: "CB-HD-012",
    name: "HDMI Cable 2M",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv88un7tfB2Hw8PvhE5ly14W2CciAffv2CgoHjOHnBVv424HTee0LKx3OhkqbZzA6MElzBQhnKACpI64Bq-eLDfjhTngT8hES7n9jFbifzy8t_DV01_s3o_S4QKnL_G8Prw6qA-d3_18oDb-10jKPeMF9t0PFHX4W1nqEfxyPnXxuV-P4J72MuICVYCywBv0SL3nOlTCkwVwU4n1bzk5xWg2gLcwcrH8EoT9hNxl4nla39PPqyeMbmDac2Bc1HIQfiJYRM6tOvzMk",
  },
  {
    id: "p_4",
    sku: "MN-USB-C-001",
    name: "USB-C Hub 7-in-1",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=USB-C+Hub",
  },
  {
    id: "p_5",
    sku: "LP-STD-002",
    name: "Laptop Stand Aluminium",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Laptop+Stand",
  },
  {
    id: "p_6",
    sku: "WC-FHD-003",
    name: "Webcam 1080p",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Webcam",
  },
  {
    id: "p_7",
    sku: "HP-OVE-007",
    name: "Over-Ear Headphones",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Headphones",
  },
  {
    id: "p_8",
    sku: "PS-65W-008",
    name: "65W USB-C Power Supply",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Power+Supply",
  },
  {
    id: "p_9",
    sku: "MN-27-009",
    name: "27in IPS Monitor",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Monitor",
  },
  {
    id: "p_10",
    sku: "SD-EXT-010",
    name: "1TB External SSD",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=External+SSD",
  },
  {
    id: "p_11",
    sku: "CB-USB-011",
    name: "USB-A to USB-C Cable 1M",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=USB+Cable",
  },
  {
    id: "p_12",
    sku: "MO-PA-013",
    name: "Ergonomic Mouse Pad XL",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Mouse+Pad",
  },
  {
    id: "p_13",
    sku: "KV-SW-014",
    name: "4-Port KVM Switch",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=KVM+Switch",
  },
  {
    id: "p_14",
    sku: "NB-SLV-015",
    name: "Laptop Sleeve 15in",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=Laptop+Sleeve",
  },
  {
    id: "p_15",
    sku: "BT-SPK-016",
    name: "Portable Bluetooth Speaker",
    image: "https://placehold.co/400x400/e5e7eb/374151?text=BT+Speaker",
  },
];

export const PENDING_ORDER: Order = {
  id: "ORD-5532",
  priority: "NEXT_DAY",
  status: "PENDING",
  items: {
    item_4: {
      id: "item_4",
      product: {
        id: "p_4",
        sku: "MN-USB-C-001",
        name: "USB-C Hub 7-in-1",
      },
      location: { zone: "A", aisle: 1, shelf: "3", bin: 7 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: "0.3KG",
    },
    item_5: {
      id: "item_5",
      product: {
        id: "p_5",
        sku: "LP-STD-002",
        name: "Laptop Stand Aluminium",
      },
      location: { zone: "B", aisle: 2, shelf: "1", bin: 3 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: "0.8KG",
    },
  },
  itemIds: ["item_4", "item_5"],
};

export const INITIAL_ORDER: Order = {
  id: "ORD-5531",
  priority: "URGENT",
  status: "PACKING",
  items: {
    item_1: {
      id: "item_1",
      product: {
        id: "p_1",
        sku: "MS-WL-099",
        name: "Wireless Mouse",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB6x6mgnt8diKRFbcHoxv0VLYW1KhEBfi1Qd6l_HpjdO1M6wQqbqgDGytoPQhIfi5FCCeyBYwshfSs9PGsCsE0TpRUUokZJdCPARIf1rDU4VuMdB9OT4w9RdIVZr09K7ytGuWOfV-pjqdLtcoQnwvBqXteURlQikqj_KWD-aQW1vrhBTZB_Cfw07JfU7datxV4aolTwwYtesooYyR0ZgY0pNxjc3fYX7tftZqRlsvnLoGAyYK8LHkGdkNhpnBbFitMwJ20v4dienQo",
      },
      location: { zone: "Z", aisle: 1, shelf: "4", bin: 4 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: "0.2KG",
    },
    item_2: {
      id: "item_2",
      product: {
        id: "p_2",
        sku: "KB-MC-044",
        name: "Mechanical Keyboard",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDe5mcmDdZd61AbmR-apI_xxZXLAB7ixN3eICOp4HpWL3ijOadJ1718fzvVVal13R9LsjNmpfaD8voGujKqWipMHdCU3YYabIGKr6GkP_lXOBFWAMn_k5TKhpw6zzXt3CksJ3tzYhrubbCW8z6EfkJSAWdh2pgVreb23hDRwx4dAgmdgk0fFFfHW0efdpHJ64yC92Eb0sC-GvaA90RSNmtP1qrS4vSt02HKUmawPAWO-RVRuIsdA10QK1415vIqal7iRM-N7TaAda4",
      },
      location: { zone: "Z", aisle: 2, shelf: "1", bin: 1 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: "1.1KG",
    },
    item_3: {
      id: "item_3",
      product: {
        id: "p_3",
        sku: "CB-HD-012",
        name: "HDMI Cable 2M",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDv88un7tfB2Hw8PvhE5ly14W2CciAffv2CgoHjOHnBVv424HTee0LKx3OhkqbZzA6MElzBQhnKACpI64Bq-eLDfjhTngT8hES7n9jFbifzy8t_DV01_s3o_S4QKnL_G8Prw6qA-d3_18oDb-10jKPeMF9t0PFHX4W1nqEfxyPnXxuV-P4J72MuICVYCywBv0SL3nOlTCkwVwU4n1bzk5xWg2gLcwcrH8EoT9hNxl4nla39PPqyeMbmDac2Bc1HIQfiJYRM6tOvzMk",
      },
      location: { zone: "Z", aisle: 3, shelf: "2", bin: 2 },
      quantityRequired: 2,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: "0.3KG",
    },
  },
  itemIds: ["item_1", "item_2", "item_3"],
};
