export interface Client {
  clientId?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyId: number;
  companyName: string;
}

export interface Company {
  companyId: number;
  companyName: string;
}
