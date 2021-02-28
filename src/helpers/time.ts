import { WeekDay } from '../util/types';

export const WEEK_DAYS = {
	[WeekDay.Monday]: 'Monday',
	[WeekDay.Tuesday]: 'Tuesday',
	[WeekDay.Wednesday]: 'Wednesday',
	[WeekDay.Thursday]: 'Thursday',
	[WeekDay.Friday]: 'Friday',
	[WeekDay.Saturday]: 'Saturday',
	[WeekDay.Sunday]: 'Sunday',
};

export function getWeekDayName(number: WeekDay): string {
	return Object.values(WEEK_DAYS)[number];
}

/**
 *
 * @param timestamp Time in ms
 */
export function getTimeString(timestamp: number): string {
	const date = new Date(timestamp);

	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();

	return `${h ? `${h}h ` : ''}${m ? `${m}m ` : ''}${s ? `${s}s` : ''}`;
}
