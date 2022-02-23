export interface DeleteStock {
  delete(id: string): Promise<void>;
}
