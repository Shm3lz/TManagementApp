import { createAction, createReducer } from '@reduxjs/toolkit';
import { ById, WeekDay } from '../../util/types';

export interface SimpleGoal {
	progress: number;
	objective: number;
	unitName: string;
}

export interface ComplexGoal {
	objective: Array<GenericTask<SimpleGoal>>,
	unitName: 'subtasks';
}

export interface GenericTask<G> {
	id: string; // is a timestamp actually
	date: Date;
	name: string;
	description?: string;
	color: string; // replace with color type
	goal?: G;
	done: boolean;
}

export type Task = GenericTask<SimpleGoal | ComplexGoal>;

export type SingleTask = Task;

export interface RegularTaskInstance extends Task {
	templateId: string;
}

export interface RegularTaskTemplate extends Task {
	repeat: WeekDay[];
}

/*
// select date -> load instances -> load templates --close-->
// -> for each done and edited tamplate create new instance -> save instances
// ??? Load data from native storage when app is launched ??? save data when app is closed ???
// ??? load data from native storage when date is selected (use it with redux) ??? save data when date is reselected ???
const state = {
	// Темплейты регулярных задач
	templates: {},

	// Экземпляры единичных и выполненных/измененных регулярных задач
	instances: {},
}
*/
interface TasksState {
	single: ById<SingleTask>;
	regular: ById<RegularTaskInstance>;
	templates: ById<RegularTaskTemplate>
}

export const addRegularTask = createAction<RegularTaskTemplate>('tasks/addRegularTask');

export const addSingleTask = createAction<SingleTask>('tasks/addSingleTask');

export const deleteSingleTask = createAction<string>('tasks/deleteSingleTask');

export const deleteRegularTask = createAction<string>('tasks/deleteRegularTask');

export const instantiateTemplate = createAction<{ id: string, date: Date }>('tasks/instantiateTemplate');

export const editSingleTask = createAction<{ id: string, data: Partial<SingleTask> }>('tasks/editSingleTask');

export const setTaskDone = createAction<{ id: string, done?: boolean }>('tasks/setTaskDone');

const initialState: TasksState = {
	templates: {},
	single: {
		'1': {
			id: '1',
			date: new Date(),
			name: 'tst111111111111111111111111111111111111111111111111111111111111',
			description: 'Test description',
			color: '#000000',
			goal: {
				progress: 11,
				objective: 20,
				unitName: 'times',
			},
			done: false,
		},
		'2': {
			id: '2',
			date: new Date(),
			name: 'tst 2',
			description: 'Test description',
			color: '#000000',
			goal: {
				progress: 0,
				objective: 20,
				unitName: 'times',
			},
			done: true,
		},
		'3': {
			id: '3',
			date: new Date(),
			name: 'Test task 3',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			color: '#eb4034',
			goal: {
				objective: [
					{ id: '6', date: new Date(), name: 'subtask 1', color: '#000000', done: false },
					{ id: '7', date: new Date(), name: 'subtask 3', color: '#000000', done: true },
					{ id: '8', date: new Date(), name: 'subtask 4', color: '#000000', done: false },
					{ id: '9', date: new Date(), name: 'subtask 2', color: '#000000', done: false },
				],
				unitName: 'subtasks',
			},
			done: false,
		},
		'4': {
			id: '4',
			date: new Date(),
			name: 'Test task 4',
			color: '#eb5055',
			done: false,
		},
	},

	regular: {},
};

export const tasksReducer = createReducer<TasksState>(initialState, builder => {
	builder.addCase(addRegularTask, (state, action) => {
		state.templates[action.payload.id] = action.payload;
	});

	builder.addCase(addSingleTask, (state, action) => {
		state.single[action.payload.id] = action.payload;
	});

	builder.addCase(deleteSingleTask, (state, { payload: id }) => {
		delete state.single[id];
	});

	builder.addCase(editSingleTask, (state, action) => {
		const task = state.single[action.payload.id];

		state.single[action.payload.id] = {
			...task,
			...action.payload.data,
		};
	});

	builder.addCase(deleteRegularTask, (state, { payload: id }) => {
		const templateId = state.regular[id].templateId;

		// Delete all instances
		for (const task of Object.values(state.regular)) {
			if (task.templateId == templateId && !task.done) {
				delete state.regular[task.id];
			}
		}

		// Delete template
		delete state.templates[templateId];
	});

	builder.addCase(instantiateTemplate, (state, action) => {
		const instanceId = Date.now().toString();
		const template = state.templates[action.payload.id];
		state.regular[instanceId] = {
			...template,
			id: instanceId,
			date: action.payload.date,
			templateId: template.id,
		};
	});

	builder.addCase(setTaskDone, (state, action) => {
		const { id, done = true } = action.payload;

		if (id in state.single) state.single[id].done = done;
		if (id in state.regular) state.regular[id].done = done;
	});
});

