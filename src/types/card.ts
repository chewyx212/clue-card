export interface CardData {
  id: number;
  password: string;
  contentType: 'text' | 'image';
  content: string;
  title?: string;
}
