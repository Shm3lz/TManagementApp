export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type ById<T> = { [id: string]: T };

export enum WeekDay {
	Monday,
	Tuesday,
	Wednsday,
	Thursday,
	Friday,
	Saturday,
	Sunday,
}

