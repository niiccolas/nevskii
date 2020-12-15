import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer';
import { State } from './types';

let store: any;

export const INITIAL_STATE = {
  cart: {
    isVisible: false,
    items: [],
  },
};

const initStore = (preloadedState: State = INITIAL_STATE) => {
  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools({
      trace: true,
    })(applyMiddleware()),
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

export const useStore = (INITIAL_STATE: State) => {
  const store = useMemo(() => initializeStore(INITIAL_STATE), [INITIAL_STATE]);
  return store;
};
