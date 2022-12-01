export interface CatalogType {
  cata_id: number;
  user_id: number;
  cata_name: string;
}
export interface MemoType {
  memo_id: number;
  cata_id: number;
  title: string;
  content: string;
  update_at: number;
}
