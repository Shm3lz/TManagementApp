import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from '../reducers';

export type State = ReturnType<typeof reducer>;

const preloadedState = {};

export const store = configureStore({
	reducer,
	preloadedState,
	middleware: getDefaultMiddleware({ serializableCheck: false }),
});
