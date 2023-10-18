import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CreateOperatorType, OperatorType } from '~/types'
import { RootState } from '~/store'

export const createOperatorAction = createAsyncThunk(
  'createOperator', async (operator: CreateOperatorType | 'copy', thunkAPI) => {
    let data = operator
    let index: undefined | number
    if (operator === 'copy') {
      const { selected, operators } = (thunkAPI.getState() as RootState).operator
      index = operators.findIndex(operator => operator.id === selected)
      data = { ...operators[index] }
    }
    try {
      return {...(await axios.post('/api/operator', data)).data,index}
    } catch (e) {
      return { id: (new Date()).getTime() * -1, ...(data as CreateOperatorType), index }
    }
  }
)
