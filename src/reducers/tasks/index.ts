import { createAction, createReducer } from '@reduxjs/toolkit';
import { ById, WeekDay } from '../../util/types';

export enum GoalUnit {
	Time = 'minutes',
	Simple = 'times',
	Complex = 'subtasks',
}

export interface SimpleGoal {
	progress: number;
	objective: number;
	unitName: GoalUnit.Simple | string;
}

export interface ComplexGoal {
	objective: Array<GenericTask<SimpleGoal>>,
	unitName: GoalUnit.Complex;
}

export interface TimeGoal {
	progress: number;
	objective: number;
	unitName: GoalUnit.Time;
}

export type Goal = ComplexGoal | SimpleGoal | TimeGoal;

export interface GenericTask<G> {
	id: string; // is a timestamp actually
	date: Date;
	name: string;
	description?: string;
	color: string; // replace with color type
	goal?: G;
	timeSpent?: number; // minutes
	done: boolean;
}

export interface Task extends GenericTask<Goal> {
	templateId?: string;
}

export interface RegularTaskTemplate extends GenericTask<Goal> {
	repeat: WeekDay[];
}

interface TasksState {
	instances: ById<Task>;
	templates: ById<RegularTaskTemplate>
}

export const addRegularTask = createAction<RegularTaskTemplate>('tasks/addRegularTask');

export const addSingleTask = createAction<Task>('tasks/addSingleTask');

export const deleteTask = createAction<string>('tasks/deleteSingleTask');

export const instantiateTemplate = createAction<{ id: string, date: Date }>('tasks/instantiateTemplate');

export const editTask = createAction<{ id: string, data: Partial<Omit<Task, 'templateId'>> }>('tasks/editTask');

export const setTaskDone = createAction<{ id: string, done?: boolean }>('tasks/setTaskDone');

const initialState: TasksState = {
	templates: {},
	instances: {
		'1': {
			id: '1',
			date: new Date(),
			name: 'tst1111111111',
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
			timeSpent: 120,
			goal: {
				objective: [
					{ id: '6', date: new Date(), name: 'subtask 1', color: '#000000', done: false },
					{ id: '7', date: new Date(), name: 'subtask 3', color: '#000000', done: true },
					{ id: '8', date: new Date(), name: 'subtask 4', color: '#000000', done: false },
					{ id: '9', date: new Date(), name: 'subtask 2', color: '#000000', done: false },
				],
				unitName: GoalUnit.Complex,
			},
			done: false,
		},
		'4': {
			id: '4',
			date: new Date(),
			name: 'Test task 4',
			color: '#eb0000',
			goal: {
				unitName: GoalUnit.Time,
				objective: 70,
				progress: 56,
			},
			done: false,
		},
	},
};

export const tasksReducer = createReducer<TasksState>(initialState, builder => {
	builder.addCase(addRegularTask, (state, action) => {
		state.templates[action.payload.id] = action.payload;
	});

	builder.addCase(addSingleTask, (state, action) => {
		state.instances[action.payload.id] = action.payload;
	});

	builder.addCase(deleteTask, (state, { payload: id }) => {
		const templateId = state.instances[id].templateId;

		if (!templateId) {
			delete state.instances[id];
			return;
		}

		for (const task of Object.values(state.instances)) {
			if (task.templateId === templateId && !task.done) {
				delete state.instances[task.id];
			}
		}

		// Delete template
		templateId && delete state.templates[templateId];
	});

	builder.addCase(editTask, (state, action) => {
		const task = state.instances[action.payload.id];

		state.instances[action.payload.id] = {
			...task,
			...action.payload.data,
		};
	});

	builder.addCase(instantiateTemplate, (state, action) => {
		const instanceId = Date.now().toString();
		const template = state.templates[action.payload.id];
		state.instances[instanceId] = {
			...template,
			id: instanceId,
			date: action.payload.date,
			templateId: template.id,
		};
	});

	builder.addCase(setTaskDone, (state, action) => {
		const { id, done = true } = action.payload;

		state.instances[id].done = done;
	});
});

