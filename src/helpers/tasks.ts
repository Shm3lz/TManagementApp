import { ComplexGoal, SimpleGoal, Task } from '../reducers/tasks';

export function countTasksDone(tasks: Task[]): number {
	return tasks.reduce((acc, curr) => acc += Number(curr.done), 0);
}

export function hasComplexGoal(task: Task): boolean {
	return Array.isArray(task.goal?.objective);
}

export function getObjective(goal: SimpleGoal | ComplexGoal): number {
	const { objective } = goal;
	return Array.isArray(objective) ? countTasksDone(objective) : objective;
}

export function getTaskProgressString({ goal, done }: Task): string {
	if (!goal) return '';

	return done ? '' : `${goal.progress} of ${getObjective(goal)} ${goal.unitName}`;
}

export function getTaskProgress(goal: ComplexGoal | SimpleGoal): number {
	const objective = getObjective(goal);

	return goal.progress / objective;
}
