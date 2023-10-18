import { OperatorType } from '~/types'

export const SET_ALL_OPERATORS = 'Set all operators'
export type SetAllOperators = { type: typeof SET_ALL_OPERATORS, payload: OperatorType[] };

export const SET_LOADING_DONE = 'Set loading done'
export type SetLoadingDone = { type: typeof SET_LOADING_DONE };

export const SET_NEW_OPERATOR = 'Set new operator'
export type SetNewOperator = { type: typeof SET_NEW_OPERATOR, payload: OperatorType };

export const UPDATE_OPERATOR = 'UPDATE_OPERATOR'
export type UpdateOperator = {
  type: typeof UPDATE_OPERATOR, payload: {
    index: number;
    operator: { value?: number; firstValue?: number; secondValue?: number }
  }
};

export const DELETE_OPERATOR = 'Delete Operator'
export type DeleteOperator = {
  type: typeof DELETE_OPERATOR;
  payload: { index: number };
}

export const SET_LOADING = 'Set Loading'
export type SetLoading = { type: typeof SET_LOADING, payload: { name: 'delete' | 'create' | 'update', index: number } };

export type useOperatorActionTypes =
  SetAllOperators
  | SetLoadingDone
  | SetNewOperator
  | SetLoading
  | UpdateOperator
  | DeleteOperator;
