import { Order } from './types';

export const STATION_ID = 'STATION_04';

export const INITIAL_ORDER: Order = {
  id: 'ORD-5531',
  priority: 'URGENT',
  status: 'PACKING',
  items: [
    {
      id: 'item_1',
      product: {
        id: 'p_1',
        sku: 'MS-WL-099',
        name: 'Wireless Mouse',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6x6mgnt8diKRFbcHoxv0VLYW1KhEBfi1Qd6l_HpjdO1M6wQqbqgDGytoPQhIfi5FCCeyBYwshfSs9PGsCsE0TpRUUokZJdCPARIf1rDU4VuMdB9OT4w9RdIVZr09K7ytGuWOfV-pjqdLtcoQnwvBqXteURlQikqj_KWD-aQW1vrhBTZB_Cfw07JfU7datxV4aolTwwYtesooYyR0ZgY0pNxjc3fYX7tftZqRlsvnLoGAyYK8LHkGdkNhpnBbFitMwJ20v4dienQo'
      },
      location: { zone: 'Z', aisle: 1, shelf: '4', bin: 4 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: '0.2KG'
    },
    {
      id: 'item_2',
      product: {
        id: 'p_2',
        sku: 'KB-MC-044',
        name: 'Mechanical Keyboard',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe5mcmDdZd61AbmR-apI_xxZXLAB7ixN3eICOp4HpWL3ijOadJ1718fzvVVal13R9LsjNmpfaD8voGujKqWipMHdCU3YYabIGKr6GkP_lXOBFWAMn_k5TKhpw6zzXt3CksJ3tzYhrubbCW8z6EfkJSAWdh2pgVreb23hDRwx4dAgmdgk0fFFfHW0efdpHJ64yC92Eb0sC-GvaA90RSNmtP1qrS4vSt02HKUmawPAWO-RVRuIsdA10QK1415vIqal7iRM-N7TaAda4'
      },
      location: { zone: 'Z', aisle: 2, shelf: '1', bin: 1 },
      quantityRequired: 1,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: '1.1KG'
    },
    {
      id: 'item_3',
      product: {
        id: 'p_3',
        sku: 'CB-HD-012',
        name: 'HDMI Cable 2M',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv88un7tfB2Hw8PvhE5ly14W2CciAffv2CgoHjOHnBVv424HTee0LKx3OhkqbZzA6MElzBQhnKACpI64Bq-eLDfjhTngT8hES7n9jFbifzy8t_DV01_s3o_S4QKnL_G8Prw6qA-d3_18oDb-10jKPeMF9t0PFHX4W1nqEfxyPnXxuV-P4J72MuICVYCywBv0SL3nOlTCkwVwU4n1bzk5xWg2gLcwcrH8EoT9hNxl4nla39PPqyeMbmDac2Bc1HIQfiJYRM6tOvzMk'
      },
      location: { zone: 'Z', aisle: 3, shelf: '2', bin: 2 },
      quantityRequired: 2,
      quantityPacked: 0,
      isFullyPacked: false,
      weight: '0.3KG'
    }
  ]
};
