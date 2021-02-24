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
