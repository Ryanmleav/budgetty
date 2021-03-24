import axios from 'axios'

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASES = 'ADD_PURCHASES'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const removePurchase = (id) => {
  let data = axios.delete(`/api/budget-data/purchase/${id}`)
  .then(res => res.data)
  .catch((err) => console.log(err))
  return {
    type: REMOVE_PURCHASE,
    payload: data
  
  }
}

export const addPurchase = (price, description, category) => {
 let data = axios.post('/api/budget-data/purchase', {
    description,
    price,
    category
  })
  .then(res => res.data)
  .catch((err) => console.log(err))
  
  return {
    type: ADD_PURCHASES,
    payload: data
  }
}

export const requestBudgetData = () => {
  let data = axios.get(`/api/budget-data`)
  .then(res => res.data)
  .catch((err) => console.log(err))
  return {
    type: REQUEST_BUDGET_DATA,
    payload: data
  }
}
export default function budgetReducer(state = initialState, action){
  switch (action.type){
    case REQUEST_BUDGET_DATA + '_PENDING' :
    return{
      ...state,
      loading: true
    }
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return{
        ...state,
        ...action.payload,
        loading:false
      }
     
    case ADD_PURCHASES + '_PENDING' :
      return {
        ...state,
        loading: true
      }
      case ADD_PURCHASES + '_FULFILLED' :
        return {
          ...state,
          purchases: action.payload,
          loading: false
        }
        case REMOVE_PURCHASE + '_PENDING' :
          return {
            ...state,
            loading: true
          }
          case REMOVE_PURCHASE + '_FULFILLED' :
            return {
              ...state,
              purchases: action.payload,
              loading: false
            }
            default: return state
  }
  }
  
