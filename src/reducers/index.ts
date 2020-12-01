import { combineReducers } from '@reduxjs/toolkit';
import { chosenDateReducer } from './chosenDate';

export default combineReducers({
	chosenDate: chosenDateReducer,
});
