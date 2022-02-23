export interface DeleteOrder {
  delete(id: string): Promise<void>;
}
