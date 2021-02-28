import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { createTransform } from 'redux-persist';
import reducer from '../reducers';

export type State = ReturnType<typeof reducer>;

const DateTransform = createTransform<State, any, any, any>(
	// transform state on its way to being serialized and persisted.
	(inboundState, key) => {
		// convert mySet to an Array.
		return inboundState;
	},
	// transform state being rehydrated
	(outboundState, key) => {
		// convert mySet back to a Set.
		const newState = { ...outboundState };
		for (const id of Object.keys(outboundState.instances)) {
			newState.instances[id] = {
				...outboundState.instances[id],
				date: new Date(outboundState.instances[id].date),
			};
		}
		return newState;
	},
	{ whitelist: ['tasks'] },
);

const persisted = persistReducer({ key: 'tasks', storage: AsyncStorage, blacklist: ['chosenDate'], transforms: [DateTransform] }, reducer);

export const store = configureStore({
	reducer: persisted,
	middleware: getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

export const persistor = persistStore(store);
