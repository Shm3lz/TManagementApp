export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type ById<T> = { [id: string]: T };

export enum WeekDay {
	Monday = 'Mo',
	Tuesday = 'Tu',
	Wednesday = 'We',
	Thursday = 'Th',
	Friday = 'Fr',
	Saturday = 'Sa',
	Sunday = 'Su',
}

