import { ComplexGoal, SimpleGoal, Task } from '../reducers/tasks';

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

export function getTaskProgressString({ goal, done }: Task): string {
	if (!goal) return '';

	return done ? '' : `${getGoalProgress(goal)} of ${getObjective(goal)} ${goal.unitName}`;
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
