import { createSelector } from 'reselect';
import { RegularTaskInstance, RegularTaskTemplate, SingleTask } from '../../reducers/tasks';
import { State } from '../../store';
import { WeekDay } from '../../util/types';

export const getSingleTasksByDate = createSelector<State, Date, SingleTask[], SingleTask[]>(
	(state, date) => Object
		.values(state.tasks.single)
		.filter(item => item.date === date),
	items => items,
);

export const getRegularTasksByDate = createSelector<
	State,
	Date,
	RegularTaskInstance[],
	RegularTaskInstance[]
>(
	(state, date) => Object
		.values(state.tasks.regular)
		.filter(item => item.date === date),
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
