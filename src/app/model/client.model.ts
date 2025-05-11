export interface Client {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyId: number;
  companyName: string;
}

export interface Company {
  id: number;
  companyName: string;
}
