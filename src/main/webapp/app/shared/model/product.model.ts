import { IInvoice } from 'app/shared/model/invoice.model';

export interface IProduct {
  id?: number;
  name?: string;
  quantity?: number;
  priceNetto?: number;
  vAT?: number;
  priceBrutto?: number;
  invoices?: IInvoice[];
}

export const defaultValue: Readonly<IProduct> = {};
