import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { OperatorType } from '~/types'
import { RootState } from '~/store'

const calc: Record<string, (a: number, b: number) => number> = {
  sum: (a, b) => a + b,
  minus: (a, b) => a - b,
  divide: (a, b) => Math.floor(a / b),
  multiple: (a, b) => a * b,
}
export type UpdateOperatorArgsType =
  Partial<Pick<OperatorType, 'firstValue' | 'secondValue'>>
  & { index: number };

export const updateOperatorAction = createAsyncThunk(
  'updateOperator', async (args: UpdateOperatorArgsType, thunkAPI) => {

    const { title, secondValue, firstValue, id } = (thunkAPI.getState() as RootState).operator.operators[args.index]
    let value: undefined | number
    if (typeof (args.firstValue ?? firstValue) === 'number' && typeof (args.secondValue ?? secondValue) === 'number') {
      value = calc[title!.toLowerCase()]((args.firstValue ?? firstValue)!, (args.secondValue ?? secondValue)!)
    }
    //Todo enable if server needed
    // try {
    //   const response = await axios.put(`/api/operator/${id}`, {
    //     firstValue: args.firstValue ?? firstValue,
    //     secondValue: args.secondValue ?? secondValue,
    //     value
    //   })
    //   return { index: args.index, ...response.data }
    // } catch (e) {
    //   return { ...args, value }
    // }
    return { ...args, value }
  }
)
