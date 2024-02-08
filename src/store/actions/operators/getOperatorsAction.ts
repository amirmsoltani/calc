import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getOperatorsAction = createAsyncThunk(
  'getAllOperator', async () => {
    //Todo enable if server needed
    // try {
    //   return (await axios.get('/api/operator')).data
    // } catch (e) {
    //   const storage = localStorage.getItem('operator')
    //   return storage ? JSON.parse(storage) : []
    // }

    const storage = localStorage.getItem('operator')
    return storage ? JSON.parse(storage) : []

  }
)
