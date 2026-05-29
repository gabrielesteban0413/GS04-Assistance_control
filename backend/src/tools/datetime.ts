import { DateTime } from 'luxon';

export type DatetimeUnit =
    | 'year'
    | 'month'
    | 'day'
    | 'hour'
    | 'minute'
    | 'second'
    | 'millisecond';
export type DatetimeUnits = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

export class Datetime {
    now = (): Date => {
        return DateTime.utc().toJSDate();
    };

    fromDate = (date: Date): Date => {
        return DateTime.fromJSDate(date).toUTC().toJSDate();
    };
    fromISOText = (iso: string): Date => {
        return DateTime.fromISO(iso, { zone: 'utc' }).toJSDate();
    };
    fromTimestamp = (timestamp: number): Date => {
        return DateTime.fromMillis(timestamp).toUTC().toJSDate();
    };

    plus = (date: Date, unit: DatetimeUnits, count: number): Date => {
        return DateTime.fromJSDate(date)
            .plus({
                [unit]: count,
            })
            .toJSDate();
    };
    minus = (date: Date, unit: DatetimeUnits, count: number): Date => {
        return DateTime.fromJSDate(date)
            .minus({
                [unit]: count,
            })
            .toJSDate();
    };
    resetDateToStart = (date: Date, unit: DatetimeUnit): Date => {
        return DateTime.fromJSDate(date).startOf(unit).toJSDate();
    };
    resetDateToEnd = (date: Date, unit: DatetimeUnit): Date => {
        return DateTime.fromJSDate(date).endOf(unit).toJSDate();
    };
    formatToText = (date: Date, format: string): string => {
        return DateTime.fromJSDate(date).toFormat(format);
    };
}

export const datetimeTool = new Datetime();