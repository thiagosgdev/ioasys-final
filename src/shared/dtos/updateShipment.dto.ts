export type UpdateShipmentDTO = {
  id: string;
  order_id?: string;
  address_id?: string;
  status?: string;
  deadline?: Date;
};
