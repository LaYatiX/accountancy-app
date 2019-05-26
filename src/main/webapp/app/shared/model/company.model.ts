import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface ICompany {
  id?: number;
  companyName?: string;
  shortName?: string;
  name?: string;
  surname?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  nIP?: string;
  phone?: number;
  formOfTaxation?: string;
  vATpayer?: boolean;
  zUSeasyStart?: boolean;
  zUSmall?: boolean;
  zUSdisease?: boolean;
  isZUSpayer?: boolean;
  monthSumUps?: IMonthSumUp[];
  senders?: IInvoice[];
}

export const defaultValue: Readonly<ICompany> = {
  vATpayer: false,
  zUSeasyStart: false,
  zUSmall: false,
  zUSdisease: false,
  isZUSpayer: false,
  id: 0
};
