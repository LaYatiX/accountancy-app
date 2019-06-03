import { IExpense } from 'app/shared/model/expense.model';
import { IIncome } from 'app/shared/model/income.model';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IEntry {
  id?: number;
  amount?: number;
  description?: string;
  expense?: IExpense;
  income?: IIncome;
  invoice?: IInvoice;
  transient?: boolean;
}

export const defaultValue: Readonly<IEntry> = {};
