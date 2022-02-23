export interface DeleteShipment {
  delete(id: string): Promise<void>;
}
