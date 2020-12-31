import { createAction, createReducer } from '@reduxjs/toolkit';
import { ById, WeekDay } from '../util/types';

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

interface Task {
	id: string;
	date: Date;
	name: string;
	description: string;
	color: string; // replace with color type
	goal: Goal;
	done: boolean;
}

type SingleTask = Task;

interface RegularTaskInstance extends Task {
	templateId: string;
}

interface RegularTaskTemplate extends Task {
	templateId: string;
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

const addRegularTask = createAction<RegularTaskTemplate>('tasks/addRegularTask');

const addSingleTask = createAction<SingleTask>('tasks/addSingleTask');

const deleteSingleTask = createAction<string>('tasks/deleteSingleTask');

const deleteRegularTask = createAction<string>('tasks/deleteRegularTask');

const instantiateTemplate = createAction<{ id: string, date: Date}>('tasks/instantiateTemplate');

const initialState = {
	templates: {},
	single: {},
	regular: {},
};

const tasksReducer = createReducer<TasksState>(initialState, builder => {
	builder.addCase(addRegularTask, (state, action) => {
		state.templates[action.payload.templateId] = action.payload;
	});

	builder.addCase(addSingleTask, (state, action) => {
		state.single[action.payload.id] = action.payload;
	});

	builder.addCase(deleteSingleTask, (state, { payload: id }) => {
		delete state.single[id];
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

		// generate unique id here
		const instanceId = `TEST_ID_${action.payload.id}`;
		state.regular[instanceId] = {
			...state.templates[action.payload.id],
			id: instanceId,
			date: action.payload.date,
		};
	});
});

export { tasksReducer, addSingleTask, addRegularTask, instantiateTemplate };
