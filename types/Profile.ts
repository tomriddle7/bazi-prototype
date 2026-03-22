export type Gender = 'male' | 'female';
export type Calendar = 'solar' | 'lunar';

type ZerotoOne = '0' | '1';
type ZerotoTwo = ZerotoOne | '2';
type ZerotoThree = ZerotoTwo | '3';
type ZerotoFive = ZerotoThree | '4' | '5';
export type Digits = ZerotoFive | '6' | '7' | '8' | '9';
export type TimeDigit<T extends string> =
    T extends `${ZerotoTwo}${Digits}${infer Rest}`
    ? (Rest extends ``
        ? T
        : (
            Rest extends `${ZerotoFive}${Digits}`
            ? T
            : never
        )
    )
    : never;
export type DateDigit<T extends string> =
    T extends `19${Digits}${Digits}${infer Rest}`
    ? (Rest extends ``
        ? T
        : (
            Rest extends `${ZerotoOne}${Digits}${ZerotoThree}${Digits}`
            ? T
            : never
        )
    )
    : never;

export interface IProfile {
    name: string;
    gender: Gender;
    birthDate: DateDigit<string>;
    birthTime: TimeDigit<string>;
    calendar: Calendar;
    summerTime?: boolean;
    hourKnown: boolean;
    yaja: boolean;
    longitude: number;
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
}

export interface ILongitude {
    label: string;
    value: number;
    offset: number;
}

interface IDate {
    month: number;
    day: number;
    hour: number;
}

export interface ISummerTime {
    year: number;
    start: IDate;
    end: IDate;
}