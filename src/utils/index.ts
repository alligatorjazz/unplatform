export function multiclass(...args: (string | undefined)[]) {
	// combines several css module names into single class

	// filters out undefined classes
	const classes = args.filter((arg) => { if (arg) { return arg; } else { return false; } });
	return classes.join(" ");
}

export type RGBAColor = {
	r: number;
	g: number;
	b: number;
	a: number;
}

// converts an rgba string to RGBAColor
const rgbaRegex = new RegExp(/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/);
export function getRGBA(str: string): RGBAColor | null {
	const matches = str.match(rgbaRegex);
	if (!matches) {
		return null;
	}

	const values = matches.filter((match) => match != str && match != "");
	return {
		r: parseInt(values[0] ?? "0"),
		g: parseInt(values[1] ?? "0"),
		b: parseInt(values[2] ?? "0"),
		a: parseInt(values[3] ?? "0")
	};
}

export function toRGBA(color: RGBAColor): string {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}


export function deterministicHash(text: string) {
	let avg = 0;
	text.split("").map(char => avg = (avg + char.charCodeAt(0)) / 2)
	return avg;
}
export const sixteenNine = (multiplier: number) => ({
	width: 16 * multiplier,
	height: 9 * multiplier,
});
export const fourThree = (multiplier: number) => ({
	width: 4 * multiplier,
	height: 3 * multiplier,
});