export interface Client {
  id?: number;
  name: string;
  email: string;
  phone: string;
  empresa: Empresa;
}

export interface Empresa {
  id: number;
  nombre: string;
}
