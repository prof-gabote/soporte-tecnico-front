export interface Client {
  id?: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  company: Company;
}

export interface Company {
  id: number;
  companyName: string;
}
