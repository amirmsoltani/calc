import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '~/store'

export const deleteOperatorAction = createAsyncThunk(
  'deleteOperator', async (_, thunkAPI) => {
    const { selected, operators } = (thunkAPI.getState() as RootState).operator
    const index = operators.findIndex(item => item.id === selected)
    try {
      await axios.delete(`/api/operator/${selected}`)
    } finally {
      return { index }
    }
  }
)
