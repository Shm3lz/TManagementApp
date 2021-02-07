import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
	tasksReducer,
	addSingleTask,
	deleteSingleTask,
	editSingleTask,
	addRegularTask,
	deleteRegularTask,
	instantiateTemplate,
	setTaskDone,
	Task,
	SingleTask,
	RegularTaskTemplate,
} from './index';

function createEmptyStore() {
	return configureStore({
		reducer: tasksReducer,
		middleware: getDefaultMiddleware({ serializableCheck: false }),
	});
}

const dateMockValue = 1;
Date.now = jest.fn(() => dateMockValue);

describe('Tasks redux state', () => {
	const taskId = 'test_task_id';
	const singleTask: Task = {
		id: taskId,
		date: new Date(),
		name: 'Test task',
		description: 'Test description',
		color: '#ffffff',
		done: false,
	};

	const regularTask: RegularTaskTemplate = {
		id: taskId,
		date: new Date(),
		name: 'Test task',
		description: 'Test description',
		color: '#ffffff',
		done: false,
		repeat: [1, 2, 3],
	};

	describe('#addSingleTask', () => {
		it('Adds single task to store', () => {
			const store = createEmptyStore();
			store.dispatch(addSingleTask(singleTask));
			expect(store.getState().single[taskId]).toBe(singleTask);
		});
	});

	describe('#editSingleTask', () => {
		it('Edits single task by id', () => {
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					single: {
						[taskId]: singleTask,
					},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			const newTaskData: Partial<SingleTask> = {
				description: 'New test description',
				color: '#000000',
			};

			store.dispatch(editSingleTask({ id: taskId, data: newTaskData }));
			const edited = store.getState().single[taskId];
			expect(edited.description).toBe('New test description');
			expect(edited.color).toBe('#000000');
		});
	});

	describe('#deleteSingleTask', () => {
		it('Deletes single task from store by id', () => {
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					single: {
						[taskId]: singleTask,
					},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});
			store.dispatch(deleteSingleTask(taskId));
			expect(store.getState().single[taskId]).toBeUndefined();
		});
	});

	describe('#addRegularTask', () => {
		it('Adds regular task to store as template', () => {
			const store = createEmptyStore();
			store.dispatch(addRegularTask(regularTask));
			expect(store.getState().templates[taskId]).toBe(regularTask);
		});
	});

	describe('#deleteRegularTask', () => {
		it('Deletes regular task instace from store with it\'s template', () => {
			const instanceTaskId = `${taskId}_instance`;
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					templates: {
						[taskId]: regularTask,
					},
					regular: {
						[instanceTaskId]: {
							...singleTask,
							id: instanceTaskId,
							templateId: taskId,
						},
					},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			store.dispatch(deleteRegularTask(instanceTaskId));
			expect(store.getState().templates[taskId]).toBeUndefined();
			expect(store.getState().regular[instanceTaskId]).toBeUndefined();
		});
	});

	describe('#instantiateTemplate', () => {
		it('Create instance of template in store', () => {
			const date = new Date();
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					templates: {
						[taskId]: regularTask,
					},
					regular: {},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			store.dispatch(instantiateTemplate({ id: taskId, date }));

			const instance = store.getState().regular[dateMockValue];
			expect(instance).not.toBeUndefined();
			expect(instance).toHaveProperty('templateId', taskId);
		});
	});

	describe('#setTaskDone', () => {
		it('Sets task\'s done value to true by default', () => {
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					single: {
						[taskId]: singleTask,
					},
					regular: {},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			store.dispatch(setTaskDone({ id: taskId }));
			expect(store.getState().single[taskId].done).toBeTruthy();
		});

		it('Changes single task\'s value', () => {
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					single: {
						[taskId]: {
							...singleTask,
							done: true,
						},
					},
					regular: {},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			store.dispatch(setTaskDone({ id: taskId, done: false }));
			expect(store.getState().single[taskId].done).toBeFalsy();
		});

		it('Changes regular task\'s value', () => {
			const store = configureStore({
				reducer: tasksReducer,
				preloadedState: {
					regular: {
						[taskId]: singleTask,
					},
					single: {},
				},
				middleware: getDefaultMiddleware({ serializableCheck: false }),
			});

			store.dispatch(setTaskDone({ id: taskId, done: true }));
			expect(store.getState().regular[taskId].done).toBeTruthy();
		});
	});
});
