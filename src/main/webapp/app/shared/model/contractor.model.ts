import { IInvoice } from 'app/shared/model/invoice.model';

export interface IContractor {
  id?: number;
  companyName?: string;
  shortName?: string;
  name?: string;
  postalCode?: string;
  city?: string;
  nIP?: string;
  phone?: number;
  receivers?: IInvoice[];
}

export const defaultValue: Readonly<IContractor> = {};
