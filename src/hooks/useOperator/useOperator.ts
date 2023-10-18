import { Reducer, useEffect, useReducer } from 'react'
import { OperatorType } from '~/types'
import {
  DELETE_OPERATOR,
  SET_ALL_OPERATORS,
  SET_LOADING,
  SET_LOADING_DONE,
  SET_NEW_OPERATOR,
  UPDATE_OPERATOR,
  useOperatorActionTypes
} from './useOperatorActionTypes'
import axios from 'axios'

type StateType = {
  dataIsLoading: boolean;
  createLoading?: number;
  updateLoading?: number;
  deleteLoading?: number;
  operators: OperatorType[];
}

const reducer: Reducer<StateType, useOperatorActionTypes> = (state, action) => {
  switch (action.type) {
    case SET_ALL_OPERATORS:
      return { ...state, dataIsLoading: false, operators: action.payload }

    case SET_LOADING_DONE:
      return { ...state, dataIsLoading: false }

    case SET_NEW_OPERATOR:
      return { ...state, createLoading: undefined, operators: [...state.operators, action.payload] }

    case UPDATE_OPERATOR: {
      const { index, operator: { firstValue, secondValue, value } } = action.payload
      const operators = [...state.operators]
      const operator = { ...operators[index], firstValue, secondValue, value }
      operators[index] = operator
      return { ...state, updateLoading: undefined, operators }
    }
    case  DELETE_OPERATOR: {
      const operators = [...state.operators]
      operators.splice(action.payload.index, 1)
      return { ...state, deleteLoading: undefined, operators: operators }
    }
    case SET_LOADING:
      return { ...state, [`${action.payload.name}Loading`]: action.payload.index }
    default:
      return state
  }
}

const initialValue = (): StateType => {
  const operatorsJson = localStorage.getItem('operators')

  return { dataIsLoading: true, operators: operatorsJson ? JSON.parse(operatorsJson) : [] }
}

export const useOperator = () => {
  const [state, dispatch] = useReducer(reducer, undefined, initialValue)

  useEffect(() => {
    axios.get('/api/operator')
      .then((response) => {
        dispatch({ type: SET_ALL_OPERATORS, payload: response.data })
      })
      .catch(() => {
        dispatch({ type: SET_LOADING_DONE })
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('operators', JSON.stringify(state.operators))
  }, [state.operators])

  const addOperator = (title: string) => {
    dispatch({ type: SET_LOADING, payload: { name: 'create', index: -1 } })
    axios.post('/api/operator', { title }).then((response) => {
      dispatch({ type: SET_NEW_OPERATOR, payload: response.data })
    }).catch(() => {
      dispatch({ type: SET_NEW_OPERATOR, payload: { title } })
    })
  }

  const updateOperator = (index: number, {
    firstValue,
    secondValue,
    id
  }: Partial<Omit<OperatorType, 'title' | 'value'>>) => {
    dispatch({ type: SET_LOADING, payload: { name: 'update', index } })
    if ((firstValue || firstValue === 0) && (secondValue || secondValue === 0)) {
      let value: number | undefined
      switch (state.operators[index].title) {
        case 'Sum':
          value = firstValue + secondValue
          break
        case  'Minus':
          value = firstValue - secondValue
          break
        case 'Divide':
          value = firstValue / secondValue
          break
        case 'Multiple':
          value = firstValue * secondValue
      }
      axios.put(`/api/operator/${id}`,
        {
          firstValue,
          secondValue,
          value
        }).finally(() => {
        dispatch({
          type: UPDATE_OPERATOR, payload: {
            operator: {
              value: value!, firstValue, secondValue
            },
            index
          }
        })
      })
    } else {
      dispatch({
        type: UPDATE_OPERATOR, payload: {
          operator: {
            firstValue, secondValue
          },
          index
        }
      })
    }

  }

  const deleteOperator = (id: number) => {
    const index = state.operators.findIndex((operator) => operator.id === id)
    dispatch({ type: SET_LOADING, payload: { index, name: 'delete' } })
    axios.delete(`/api/operator/${id}`).finally(() => {
      dispatch({ type: DELETE_OPERATOR, payload: { index } })
    })
  }

  return { addOperator, updateOperator, deleteOperator, ...state }
}

