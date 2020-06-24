<<<<<<< HEAD
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initState as reducerInitialState, rootReducer } from "./store/reducers/rootReducer"
//import { createMemoryHistory } from 'history'

function render(
  ui,
  {
    //route = '/',
    //history = createMemoryHistory({initialEntries: [route]}),
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
=======
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initState as reducerInitialState, rootReducer } from "./store/reducers/rootReducer"
//import { createMemoryHistory } from 'history'

function render(
  ui,
  {
    //route = '/',
    //history = createMemoryHistory({initialEntries: [route]}),
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
>>>>>>> 47d49f8d70bf2080f645c5061e13cfe2d470008b
export { render }