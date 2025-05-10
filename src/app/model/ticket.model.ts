export interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: 'ABIERTO' | 'CERRADO';
  clientId: number;
  category: Category;
  createdAt?: string;
}

export interface Category {
  id: number;
  name: string;
}
