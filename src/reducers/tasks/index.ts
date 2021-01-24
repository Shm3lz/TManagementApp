import { createAction, createReducer } from '@reduxjs/toolkit';
import { ById, WeekDay } from '../../util/types';

interface SimpleGoal {
	progress: number; // seconds
	goal: number; // seconds
}

interface NumberGoal extends SimpleGoal {
	unitName: string;
}

type TimeGoal = SimpleGoal;

interface Subtask extends Task {
	id: string;
}

interface SubtaskGoal {
	tasks: {
		[id: string]: Subtask
	}
}

type Goal = SimpleGoal | NumberGoal | TimeGoal | SubtaskGoal;

export interface Task {
	id: string; // is a timestamp actually
	date: Date;
	name: string;
	description: string;
	color: string; // replace with color type
	goal: Goal;
	done: boolean;
}

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

const initialState = {
	templates: {},
	single: {},
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

