export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type ById<T> = { [id: string]: T };

export type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;
