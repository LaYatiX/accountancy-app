import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice.reducer';
// prettier-ignore
import content, {
  ContentState
} from 'app/entities/content/content.reducer';
// prettier-ignore
import monthSumUp, {
  MonthSumUpState
} from 'app/entities/month-sum-up/month-sum-up.reducer';
// prettier-ignore
import expense, {
  ExpenseState
} from 'app/entities/expense/expense.reducer';
// prettier-ignore
import income, {
  IncomeState
} from 'app/entities/income/income.reducer';
// prettier-ignore
import entry, {
  EntryState
} from 'app/entities/entry/entry.reducer';
// prettier-ignore
import company, {
  CompanyState
} from 'app/entities/company/company.reducer';
// prettier-ignore
import contractor, {
  ContractorState
} from 'app/entities/contractor/contractor.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly invoice: InvoiceState;
  readonly content: ContentState;
  readonly monthSumUp: MonthSumUpState;
  readonly expense: ExpenseState;
  readonly income: IncomeState;
  readonly entry: EntryState;
  readonly company: CompanyState;
  readonly contractor: ContractorState;
  readonly product: ProductState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  invoice,
  content,
  monthSumUp,
  expense,
  income,
  entry,
  company,
  contractor,
  product,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
