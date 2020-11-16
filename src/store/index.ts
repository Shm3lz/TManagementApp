import { configureStore } from '@reduxjs/toolkit';

import reducer from '../reducers';

const preloadedState = {};

export default configureStore({
	reducer,
	preloadedState,
});
