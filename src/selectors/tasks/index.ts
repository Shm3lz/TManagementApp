import { isSameDay } from 'date-fns';
import { createSelector } from 'reselect';
import { RegularTaskTemplate, Task, TasksState } from '../../reducers/tasks';
import { WeekDay } from '../../util/types';

export const getTasksByDate = createSelector<TasksState, Date, Task[], Task[]>(
	(state, date) => Object
		.values(state.instances)
		.filter(item => isSameDay(item.date, date)),
	items => items,
);

export const countTasksDoneByDate = createSelector<TasksState, Date, Task[], number>(
	getTasksByDate,
	tasks => tasks.filter(t => t.done).length,
);

export const countTasksByDate = createSelector<TasksState, Date, Task[], number>(
	getTasksByDate,
	tasks => tasks.length,
);

export const getTemplatesByDate = createSelector<
	TasksState,
	Date,
	RegularTaskTemplate[],
	RegularTaskTemplate[]
>(
	(state, date) => Object
		.values(state.templates)
		.filter(template => template.repeat.includes(date.getDay() as WeekDay)),
	items => items,
);
