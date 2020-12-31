import { combineReducers } from '@reduxjs/toolkit';
import { chosenDateReducer } from './chosenDate';
import { tasksReducer } from './tasks';

export default combineReducers({
	chosenDate: chosenDateReducer,
	tasks: tasksReducer,
});
