export interface CompanyInfo {
    name: string;
    taxId: string;
    address: string;
    website: string;
    executive: string;
    email: string;
    phone: string;
}

export interface ClientInfo {
    name: string;
    taxId: string;
    address: string;
    website: string;
    contactPerson: string;
    email: string;
    phone: string;
}

export interface QuoteItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    discount: number;
}

export interface QuoteInfo {
    number: string;
    currency: string;
    date: string;
    validity: string;
    paymentMethod: string;
}

export interface QuoteData {
    logo: string | null;
    color: string;
    company: CompanyInfo;
    client: ClientInfo;
    info: QuoteInfo;
    items: QuoteItem[];
    taxRate: number;
    notes: string;
    conditions: string;
    // New field for template selection
    template: string;
}

export interface ValidationErrors {
    [key: string]: string;
}
