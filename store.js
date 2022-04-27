import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

let store

const startingState = {
	session: {
    session_id: null,
    user_id: null,
  },
  name: null,
  location: {
    lat: null,
    lng: null,
    zoom: null,
  },
  price: null,
	connection: null,
  results: null
}

export const actionTypes = {
  SESSION: 'SESSION',
  CONNECTION: 'CONNECTION',
  RESULTS: 'RESULTS',
  NAME: 'NAME',
  PRICE: 'PRICE',
  LOCATION: 'LOCATION',
}

// REDUCERS
export const reducer = (state = startingState, action) => {
  switch (action.type) {
    case actionTypes.SESSION:
      return { 
        ...state,
        session: action.value.session,
        connection: action.value.connection 
      }
    case actionTypes.RESULTS:
      return { 
        ...state,
        results: action.value,
      }
    case actionTypes.NAME:
      return { 
        ...state,
        name: action.value,
      }
    case actionTypes.PRICE:
      return { 
        ...state,
        price: action.value,
      }
    case actionTypes.LOCATION:
      return { 
        ...state,
        location: action.value,
      }
    default:
      return state
  }
}

// ACTIONS
export const setSession = (value) => {
  return { type: actionTypes.SESSION, value: value }
}

export const setResult = (value) => {
  return { type: actionTypes.RESULTS, value: value }
}

export const setSessionName = (value) => {
  return { type: actionTypes.NAME, value: value }
}

export const setSessionPrice = (value) => {
  return { type: actionTypes.PRICE, value: value }
}

export const setSessionLocation = (value) => {
  return { type: actionTypes.LOCATION, value: value }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['results','connection','session']
};

const persistedReducer = persistReducer(persistConfig, reducer)

function makeStore(initialState = startingState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}