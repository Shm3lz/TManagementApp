import {
	getSingleTasksByDate,
	getRegularTasksByDate,
	getTemplatesByDate,
} from '.';
import { RegularTaskInstance, RegularTaskTemplate, SingleTask } from '../../reducers/tasks';
import { State } from '../../store';
import { WeekDay } from '../../util/types';

function generateTask(id: string, date: Date = new Date()): SingleTask {
	return {
		id,
		date,
		name: Math.random().toString(36).substring(5),
		description: Math.random().toString(36).substring(2),
		color: '#ffffff',
		goal: {
			progress: 0,
			goal: 5,
		},
		done: false,
	};
}

function generateRegularTask(
	id: string,
	templateId: string,
	date: Date = new Date(),
): RegularTaskInstance {
	return {
		...generateTask(id, date),
		templateId,
	};
}

function generateTemplate(id: string, repeat: WeekDay[]): RegularTaskTemplate {
	return {
		...generateTask(id),
		repeat,
	};
}

describe('Tasks selectors', () => {
	let state: State;

	// is Saturday
	const testDate = new Date(2021, 0, 1);
	testDate.getDay = jest.fn(() => WeekDay.Saturday);

	beforeEach(() => {
		state = {
			chosenDate: new Date(),
			tasks: {
				single: {},
				regular: {},
				templates: {},
			},
		};
	});

	describe('getSingleTasksByDate', () => {
		it('Should return array of single tasks for specified date', () => {
			state.tasks.single = {
				'1': generateTask('1', testDate),
				'2': generateTask('2', testDate),
				'3': generateTask('3'),
				'4': generateTask('4'),
			};

			expect(getSingleTasksByDate(state, testDate)).toStrictEqual([
				state.tasks.single['1'], state.tasks.single['2'],
			]);
		});

		it('Should return empty array if there\'s no tasks with specified date', () => {
			state.tasks.single = {
				'1': generateTask('1'),
				'2': generateTask('2'),
				'3': generateTask('3'),
				'4': generateTask('4'),
			};

			expect(getSingleTasksByDate(state, testDate)).toStrictEqual([]);
		});
	});

	describe('getRegularTasksByDate', () => {
		it('Should return array of regular tasks for specified date', () => {
			state.tasks.regular = {
				'1': generateRegularTask('1', '0', testDate),
				'2': generateRegularTask('2', '0'),
				'3': generateRegularTask('3', '0',  testDate),
				'4': generateRegularTask('4', '0'),
			};

			expect(getRegularTasksByDate(state, testDate)).toStrictEqual([
				state.tasks.regular['1'], state.tasks.regular['3'],
			]);
		});
	});

	describe('getTemplatesByDate', () => {
		it('Returns array of templates that are repeated on the same week day of date', () => {
			state.tasks.templates = {
				'1': generateTemplate('1', [WeekDay.Monday]),
				'2': generateTemplate('2', [WeekDay.Friday, WeekDay.Monday]),
				'3': generateTemplate('3', [WeekDay.Saturday]),
			};

			expect(getTemplatesByDate(state, testDate)).toStrictEqual([
				state.tasks.templates['3'],
			]);
		});
	});
});
