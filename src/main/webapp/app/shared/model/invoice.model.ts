import { Moment } from 'moment';
import { IContent } from 'app/shared/model/content.model';
import { IProduct } from 'app/shared/model/product.model';
import { ICompany } from 'app/shared/model/company.model';
import { IContractor } from 'app/shared/model/contractor.model';

export interface IInvoice {
  id?: number;
  name?: string;
  number?: string;
  documentDate?: string;
  sellPlace?: string;
  sellDate?: string;
  bankAccount?: string;
  totalNetto?: number;
  totalVat?: number;
  totalBrutto?: number;
  paymentType?: string;
  paymentDate?: string;
  paymentDueDate?: string;
  notes?: string;
  size?: number;
  mimeType?: string;
  content?: IContent;
  products?: IProduct[];
  company?: ICompany;
  contractor?: IContractor;
}

export const defaultValue: Readonly<IInvoice> = {};
