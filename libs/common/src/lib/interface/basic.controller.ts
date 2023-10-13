/**
 * Minimal controller interface
 */
export interface IBasicController<T> {
  save(item: T): Promise<T> | never;
  find(): Promise<T[]>;
  findOneById(id: number): Promise<T> | never;
  update(id: number, item: Partial<T>): Promise<{ updated: boolean }>;
  delete(id: number): Promise<{ deleted: boolean }>;
}
