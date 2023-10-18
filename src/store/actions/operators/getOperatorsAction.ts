import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getOperatorsAction = createAsyncThunk(
  'getAllOperator', async () => {
    try {
      return (await axios.get('/api/operator')).data
    } catch (e) {
      const storage = localStorage.getItem('operator')
      return storage ? JSON.parse(storage) : []
    }

  }
)
