import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMonthSumUp, defaultValue } from 'app/shared/model/month-sum-up.model';

export const ACTION_TYPES = {
  FETCH_MONTHSUMUP_LIST: 'monthSumUp/FETCH_MONTHSUMUP_LIST',
  FETCH_MONTHSUMUP: 'monthSumUp/FETCH_MONTHSUMUP',
  CREATE_MONTHSUMUP: 'monthSumUp/CREATE_MONTHSUMUP',
  UPDATE_MONTHSUMUP: 'monthSumUp/UPDATE_MONTHSUMUP',
  DELETE_MONTHSUMUP: 'monthSumUp/DELETE_MONTHSUMUP',
  RESET: 'monthSumUp/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMonthSumUp>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MonthSumUpState = Readonly<typeof initialState>;

// Reducer

export default (state: MonthSumUpState = initialState, action): MonthSumUpState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MONTHSUMUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MONTHSUMUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MONTHSUMUP):
    case REQUEST(ACTION_TYPES.UPDATE_MONTHSUMUP):
    case REQUEST(ACTION_TYPES.DELETE_MONTHSUMUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MONTHSUMUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MONTHSUMUP):
    case FAILURE(ACTION_TYPES.CREATE_MONTHSUMUP):
    case FAILURE(ACTION_TYPES.UPDATE_MONTHSUMUP):
    case FAILURE(ACTION_TYPES.DELETE_MONTHSUMUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MONTHSUMUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MONTHSUMUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MONTHSUMUP):
    case SUCCESS(ACTION_TYPES.UPDATE_MONTHSUMUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MONTHSUMUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/month-sum-ups';

// Actions

export const getEntities: ICrudGetAllAction<IMonthSumUp> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MONTHSUMUP_LIST,
  payload: axios.get<IMonthSumUp>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMonthSumUp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MONTHSUMUP,
    payload: axios.get<IMonthSumUp>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMonthSumUp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MONTHSUMUP,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMonthSumUp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MONTHSUMUP,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMonthSumUp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MONTHSUMUP,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
