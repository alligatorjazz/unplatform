import { siteBreakpoints } from "../config";
import { LiteracyLevelSchema, type LiteracyLevel } from "../types";
export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function multiclass(...args: (string | undefined)[]) {
	// combines several css module names into single class

	// filters out undefined classes
	const classes = args.filter((arg) => {
		if (arg) {
			return arg;
		}
	});
	return classes.join(" ");
}

export type RGBAColor = {
	r: number;
	g: number;
	b: number;
	a: number;
};

// converts an rgba string to RGBAColor
const rgbaRegex = new RegExp(
	/rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/
);
export function getRGBA(str: string): RGBAColor | null {
	const matches = str.match(rgbaRegex);
	if (!matches) {
		return null;
	}

	const values = matches.filter((match) => match != str && match != "");
	return {
		r: parseInt(values[0]),
		g: parseInt(values[1]),
		b: parseInt(values[2]),
		a: parseInt(values[3]),
	};
}

export function toRGBA(color: RGBAColor): string {
	return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function isAlphaNumeric(str: string) {
	let code, i, len;

	for (i = 0, len = str.length; i < len; i++) {
		code = str.charCodeAt(i);
		if (
			!(code > 47 && code < 58) && // numeric (0-9)
			!(code > 64 && code < 91) && // upper alpha (A-Z)
			!(code > 96 && code < 123)
		) {
			// lower alpha (a-z)
			return false;
		}
	}

	return true;
}

export function checkBreakpoint(breakpoint: keyof typeof siteBreakpoints): boolean {
	if (!window) {
		throw new Error(
			"Client-only function checkBreakpoint called on the server."
		);
	}

	return window.matchMedia(`(min-width: ${siteBreakpoints[breakpoint]})`).matches;
}

export const clamp = (num: number, min: number, max: number) =>
	Math.min(Math.max(num, min), max);
export function titleCase(str: string) {
	return str
		.toLowerCase()
		.split(" ")
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

export async function sendJSONPayload(
	url: string,
	payload: object
): Promise<void> {
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to send JSON payload. Status: ${response.status}`
			);
		}

		console.log("JSON payload sent successfully!");
	} catch (error) {
		console.error("Error sending JSON payload:", error);
	}
}

export function repeatRandom<T>(
	callback: (_: unknown, i: number, arr: unknown[]) => T,
	min?: number,
	max?: number
) {
	const array: T[] = [];
	const maxBound = max ?? 5;
	const minBound = min ?? 1;
	for (
		let i = 0;
		i < clamp(Math.floor(Math.random() * maxBound), minBound, maxBound);
		i++
	) {
		array.push(callback(null, i, array));
	}

	return array as T[];
}

// export const useCases = [
// 	{ name: "community", labelText: "Socializing and / or community." },
// 	{ name: "events", labelText: "Getting informed about local events." },
// 	{ name: "expression", labelText: "Expressing myself." },
// 	{ name: "news", labelText: "News and politics." }
// ] as const;

// export type UseCaseValues = Record<((typeof useCases)[number]["name"]), boolean>;
// export function loadUseCases(): UseCaseValues | null {
// 	const cachedUseCases = localStorage.getItem("useCases");
// 	if (!cachedUseCases) {
// 		return null;
// 	}

// 	try {
// 		return JSON.parse(cachedUseCases);
// 	} catch (err) {
// 		console.error("Could not parse cached use cases.");
// 		console.error(err);
// 		return null;
// 	}
// }

export function loadLiteracyLevel(): LiteracyLevel | null {
	const cachedLiteracyLevel = localStorage.getItem("literacyLevel");

	try {
		return LiteracyLevelSchema.parse(cachedLiteracyLevel);
	} catch (err) {
		console.error("Could not load literacy level.");
		console.error(err);
		return null;
	}
}

export function saveLiteracyLevel(currentLevel: LiteracyLevel) {
	try {
		localStorage.setItem("literacyLevel", LiteracyLevelSchema.parse(currentLevel));
	} catch (err) {
		console.error(`Could not save literacy level ${currentLevel}.`);
		throw err;
	}
}
