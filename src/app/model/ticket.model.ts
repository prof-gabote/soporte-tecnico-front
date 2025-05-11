export interface Ticket {
  ticketId?: number;
  title: string;
  description: string;
  status: 'ABIERTO' | 'CERRADO';
  clientId: number;
  categoryId: number;
  categoryName?: string;
  createdAt?: string;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}
