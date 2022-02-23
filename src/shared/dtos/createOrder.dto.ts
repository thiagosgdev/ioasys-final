export type CreateOrderDTO = {
  user_id: string;
  products: ProductOrderDTO[];
  quantity_items: number;
  discount: number;
  order_price: number;
  total_paid: number;
};

type ProductOrderDTO = {
  product_id: string;
  quantity: number;
};
