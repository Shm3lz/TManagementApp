import { createAction, createReducer } from '@reduxjs/toolkit';
import { add, sub } from 'date-fns';

const setChosenDate = createAction<Date>('chosenDate/set');
const incrementByDay = createAction('choseDate/increment');
const decrementByDay = createAction('chosenDate/decrement');

const chosenDateReducer = createReducer(new Date(), builder => {
	builder.addCase(setChosenDate, (_, action) => action.payload);
	builder.addCase(incrementByDay, state => state = add(state, { days: 1 }));
	builder.addCase(decrementByDay, state => state = sub(state, { days: 1 }));
});

export { chosenDateReducer, setChosenDate, incrementByDay, decrementByDay };
