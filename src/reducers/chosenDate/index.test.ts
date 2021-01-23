import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { chosenDateReducer, setChosenDate, incrementByDay, decrementByDay } from './index';
import { differenceInCalendarDays } from 'date-fns';

describe('chosenDate redux state', () => {
	it('Should set chosenDate state when setChosenDate is dispatched', () => {
		const store = configureStore({
			reducer: chosenDateReducer,
			middleware: getDefaultMiddleware({ serializableCheck: false }),
		});

		const date = new Date();
		store.dispatch(setChosenDate(date));
		expect(store.getState()).toEqual(date);
	});

	it('Should increment chosenDate state value by 1 day when incrementByDay is dispatched', () => {
		const date = new Date();
		const store = configureStore({
			reducer: chosenDateReducer,
			preloadedState: date,
			middleware: getDefaultMiddleware({ serializableCheck: false }),
		});

		store.dispatch(incrementByDay());

		expect(differenceInCalendarDays(store.getState(), date)).toBe(1);
	});

	it('Should decrement chosenDate state value by 1 day when decrementByDay is dispatched', () => {
		const date = new Date();
		const store = configureStore({
			reducer: chosenDateReducer,
			preloadedState: date,
			middleware: getDefaultMiddleware({ serializableCheck: false }),
		});

		store.dispatch(decrementByDay());

		expect(differenceInCalendarDays(date, store.getState())).toBe(1);
	});

});
