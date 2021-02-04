import { Task } from '../reducers/tasks';

export function countTasksDone(tasks: Task[]): number {
	return tasks.reduce((acc, curr) => acc += Number(curr.done), 0);
}

export function hasComplexGoal(task: Task): boolean {
	return Array.isArray(task.goal?.objective);
}
