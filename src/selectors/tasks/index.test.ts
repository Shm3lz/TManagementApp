import {
	getTasksByDate,
	getTemplatesByDate,
} from '.';
import { GoalUnit, RegularTaskTemplate, Task } from '../../reducers/tasks';
import { State } from '../../store';
import { WeekDay } from '../../util/types';

function generateTask(id: string, date: Date = new Date()): Task {
	return {
		id,
		date,
		name: Math.random().toString(36).substring(5),
		description: Math.random().toString(36).substring(2),
		color: '#ffffff',
		goal: {
			progress: 0,
			objective: 5,
			unitName: GoalUnit.Simple,
		},
		done: false,
	};
}

function generateRegularTask(
	id: string,
	templateId: string,
	date: Date = new Date(),
): Task {
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
				instances: {},
				templates: {},
			},
		};
	});

	describe('getTasksByDate', () => {
		it('Should return array of tasks for specified date', () => {
			state.tasks.instances = {
				'1': generateTask('1', testDate),
				'2': generateTask('2', testDate),
				'5': generateRegularTask('5', '0', testDate),
				'3': generateTask('3'),
				'4': generateTask('4'),
			};

			expect(getTasksByDate(state.tasks, testDate)).toStrictEqual([
				state.tasks.instances['1'], state.tasks.instances['2'], state.tasks.instances['5'],
			]);
		});

		it('Should return empty array if there\'s no tasks with specified date', () => {
			state.tasks.instances = {
				'1': generateTask('1'),
				'2': generateTask('2'),
				'3': generateTask('3'),
				'4': generateTask('4'),
			};

			expect(getTasksByDate(state.tasks, testDate)).toStrictEqual([]);
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
