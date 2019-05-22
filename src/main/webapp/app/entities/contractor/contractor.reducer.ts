import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContractor, defaultValue } from 'app/shared/model/contractor.model';

export const ACTION_TYPES = {
  FETCH_CONTRACTOR_LIST: 'contractor/FETCH_CONTRACTOR_LIST',
  FETCH_CONTRACTOR: 'contractor/FETCH_CONTRACTOR',
  CREATE_CONTRACTOR: 'contractor/CREATE_CONTRACTOR',
  UPDATE_CONTRACTOR: 'contractor/UPDATE_CONTRACTOR',
  DELETE_CONTRACTOR: 'contractor/DELETE_CONTRACTOR',
  RESET: 'contractor/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContractor>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContractorState = Readonly<typeof initialState>;

// Reducer

export default (state: ContractorState = initialState, action): ContractorState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTRACTOR_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTRACTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTRACTOR):
    case REQUEST(ACTION_TYPES.UPDATE_CONTRACTOR):
    case REQUEST(ACTION_TYPES.DELETE_CONTRACTOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTRACTOR_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTRACTOR):
    case FAILURE(ACTION_TYPES.CREATE_CONTRACTOR):
    case FAILURE(ACTION_TYPES.UPDATE_CONTRACTOR):
    case FAILURE(ACTION_TYPES.DELETE_CONTRACTOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRACTOR_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTRACTOR):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTRACTOR):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTRACTOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTRACTOR):
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

const apiUrl = 'api/contractors';

// Actions

export const getEntities: ICrudGetAllAction<IContractor> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTRACTOR_LIST,
  payload: axios.get<IContractor>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContractor> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTRACTOR,
    payload: axios.get<IContractor>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContractor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTRACTOR,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContractor> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTRACTOR,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContractor> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTRACTOR,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
