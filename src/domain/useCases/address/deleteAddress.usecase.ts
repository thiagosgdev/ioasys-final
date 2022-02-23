export interface DeleteAddress {
  delete(id: string): Promise<void>;
}
