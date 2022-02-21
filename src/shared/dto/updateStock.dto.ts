export type UpdateStockDTO = {
  id: string;
  product_id?: string;

  supplier_id?: string;

  low_amount?: number;

  unit_type?: string;

  amount?: number;
};
