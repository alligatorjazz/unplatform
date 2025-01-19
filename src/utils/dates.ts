import dayjs from "dayjs";

export function daysInMonth(month: number, year: number) {
	return new Date(year, month, 0).getDate();
}

export function getDateString(d: Date | string | number) {
	return dayjs(d).format("MM.YYYY");
}