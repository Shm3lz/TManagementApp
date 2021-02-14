import { isSameDay } from 'date-fns';
import { createSelector } from 'reselect';
import { RegularTaskTemplate, Task } from '../../reducers/tasks';
import { State } from '../../store';
import { WeekDay } from '../../util/types';

export const getTasksByDate = createSelector<State, Date, Task[], Task[]>(
	(state, date) => Object
		.values(state.tasks.instances)
		.filter(item => isSameDay(item.date, date)),
	items => items,
);

export const getTemplatesByDate = createSelector<
	State,
	Date,
	RegularTaskTemplate[],
	RegularTaskTemplate[]
>(
	(state, date) => Object
		.values(state.tasks.templates)
		.filter(template => template.repeat.includes(date.getDay() as WeekDay)),
	items => items,
);
