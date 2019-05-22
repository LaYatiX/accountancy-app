import { IInvoice } from 'app/shared/model/invoice.model';

export interface IContent {
  id?: number;
  dataContentType?: string;
  data?: any;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IContent> = {};
