import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OperatorType, StatusType } from '~/types'
import {
  createOperatorAction,
  deleteOperatorAction,
  getOperatorsAction,
  updateOperatorAction,
  UpdateOperatorArgsType
} from '~/store/actions'

export interface OperatorState {
  fetchDataStatus: StatusType;
  createDataStatus: StatusType;
  updateDataStatus: StatusType;
  deleteDataStatus: StatusType;
  selected?: number;
  operators: OperatorType[];

}

const initialState: OperatorState = {
  fetchDataStatus: 'idle',
  createDataStatus: 'idle',
  updateDataStatus: 'idle',
  deleteDataStatus: 'idle',
  operators: []
}

export const operatorSlice = createSlice({
  name: 'operator',
  initialState: initialState,
  reducers: {
    setSelect: (state, action: PayloadAction<number | undefined>) => {
      state.selected = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOperatorsAction.pending, (state) => {
      state.fetchDataStatus = 'loading'
    })
    builder.addCase(getOperatorsAction.fulfilled, (state, action) => {
      return { ...state, operators: action.payload, fetchDataStatus: 'success' }
    })
    builder.addCase(createOperatorAction.pending, (state) => {
      state.createDataStatus = 'loading'
    })
    builder.addCase(createOperatorAction.fulfilled, (state, { payload: { index, ...payload } }) => {
      if (typeof index === 'number') {
        state.selected = undefined
        state.operators.splice(index + 1, 0, payload)
      } else {
        state.operators.push(payload)
      }
      state.createDataStatus = 'success'
    })
    builder.addCase(updateOperatorAction.pending, (state) => {
      state.updateDataStatus = 'loading'
    })
    builder.addCase(updateOperatorAction.fulfilled, (state, {
      payload: {
        index,
        ...payload
      }
    }: PayloadAction<UpdateOperatorArgsType>) => {
      state.operators[index] = { ...state.operators[index], ...payload }
      state.updateDataStatus = 'success'
    })
    builder.addCase(deleteOperatorAction.pending, (state) => {
      state.deleteDataStatus = 'loading'
    })
    builder.addCase(deleteOperatorAction.fulfilled, (state, {
      payload: { index }
    }) => {
      state.operators.splice(index, 1)
      state.deleteDataStatus = 'success'
      state.selected = undefined
    })
  },
})

export const { setSelect } = operatorSlice.actions

export const operatorReducer = operatorSlice.reducer
