import { Moment } from 'moment';
import { IEntry } from 'app/shared/model/entry.model';
import { IMonthSumUp } from 'app/shared/model/month-sum-up.model';

export interface IIncome {
  id?: number;
  date?: Moment;
  entries?: IEntry[];
  monthSumUp?: IMonthSumUp;
}

export const defaultValue: Readonly<IIncome> = {};
