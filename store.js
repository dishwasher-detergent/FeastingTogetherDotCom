import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

let store

const startingState = {
	session: {
    session_id: null,
    user_id: null,
  },
	connection: null
}

export const actionTypes = {
  SESSION: 'SESSION',
  CONNECTION: 'CONNECTION',
}

// REDUCERS
export const reducer = (state = startingState, action) => {
  switch (action.type) {
    case actionTypes.SESSION:
      return { 
        session: action.value.session,
        connection: action.value.connection 
      }
    default:
      return state
  }
}

// ACTIONS
export const setSession = (value) => {
  return { type: actionTypes.SESSION, value: value }
}

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['session','connection'], // place to select which state you want to persist
}

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