export interface DeleteCategory {
  delete(id: string): Promise<void>;
}
