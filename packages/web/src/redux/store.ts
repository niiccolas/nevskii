import { useMemo } from 'react';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

type State = {
  lastUpdate: number;
  count: number;
  light: boolean;
};

let store: any;

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
};

const reducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      };
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      };
    default:
      return state;
  }
};

const initStore = (preloadedState: State = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware()),
  );
};

export const initializeStore = (preloadedState?: State) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state,
  // merge that state with the current state in the store
  // and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
  }

  // For SSG and SSR, always create a new store
  if (typeof window === 'undefined') return _store;

  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: State) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
