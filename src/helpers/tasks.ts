import { ComplexGoal, Goal, GoalUnit, SimpleGoal, Task } from '../reducers/tasks';

export function countTasksDone(tasks: Task[]): number {
	return tasks.reduce((acc, curr) => acc += Number(curr.done), 0);
}

export function hasComplexGoal(task: Task): boolean {
	return Array.isArray(task.goal?.objective);
}

export function getObjective(goal: SimpleGoal | ComplexGoal): number {
	const { objective } = goal;
	return Array.isArray(objective) ? objective.length : objective;
}

export function getGoalProgressString(goal?: Goal): string {
	if (!goal) return '';

	return `${getGoalProgress(goal)} of ${getObjective(goal)} ${goal.unitName}`;
}

export function getTaskSpentTime({ timeSpent }: Task): string {
	if (!timeSpent) return '';

	return `${timeSpent} minutes spent`;
}

export function getGoalProgress(goal: ComplexGoal | SimpleGoal): number {
	if (Array.isArray(goal.objective)) {
		return countTasksDone(goal.objective);
	}

	return (goal as SimpleGoal).progress;
}

export function getGoalPercantage(goal: ComplexGoal | SimpleGoal): number {
	return getGoalProgress(goal) / getObjective(goal);
}

export function getTaskSubtitle(task: Task): string {
	return `${task.done ? '' : getGoalProgressString(task.goal)}${task.timeSpent ? `\n${getTaskSpentTime(task)}` : ''}`;
}

export function hasTimeGoal({ goal }: Task): boolean {
	if (!goal) return false;

	return goal.unitName === GoalUnit.Time;
}
