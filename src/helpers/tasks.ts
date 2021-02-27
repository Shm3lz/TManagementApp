import { Goal, GoalUnit, Task, TaskInformation } from '../reducers/tasks';
import { ById } from '../util/types';
import { getTimeString } from './time';

export function countTasksDone(tasks: ById<Task>): number {
	return Object.values(tasks).filter(t => t.done).length;
}

export function hasComplexGoal(task: Task): boolean {
	return Boolean(task.subtasks);
}

export function getGoalProgressString(goal?: Goal): string {
	if (!goal) return '';

	return `${goal.progress} of ${goal.objective} ${goal.unitName}`;
}

export function getSubtasksProgressString(subtasks: ById<Task>): string {
	return `${countTasksDone(subtasks)} of ${Object.values(subtasks).length} subtasks done`;
}

export function getTaskSpentTime({ timeSpent }: Task): string {
	if (typeof timeSpent === 'undefined') return '';

	return `${getTimeString(timeSpent)} spent`;
}

export function getTaskProgressString(task: Task): string {
	if (task.goal) return getGoalProgressString(task.goal);

	if (task.subtasks) return getSubtasksProgressString(task.subtasks);

	return '';
}

/**
 * Get % of task completion
 * First priority - subtasks
 * Second priority - goal
 */
export function getTaskPercentage(task: Task): number {
	if (task.subtasks) return countTasksDone(task.subtasks) / Object.values(task.subtasks).length;

	if (task.goal) return getGoalPercantage(task.goal);

	return 0;
}

export function getGoalPercantage(goal: Goal): number {
	return goal.progress / goal.objective;
}

export function getTaskSubtitle(task: Task): string {
	const progress = getTaskProgressString(task);
	const spentTime = getTaskSpentTime(task);
	return `${progress}${progress && spentTime && '\n'}${spentTime}`;
}

export function hasTimeGoal({ goal }: TaskInformation | Task): boolean {
	if (!goal) return false;

	return goal.unitName === GoalUnit.Time;
}
