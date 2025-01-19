

export function clientOnly() {
	if (!document) {
		console.trace();
		throw new Error("A frontend-only function was called when `document` did not exist..");
	}
}

export function getNode(className: string) {
	clientOnly();

	const result = document.getElementsByClassName(className);

	if (result.length > 1) {
		throw new Error(
			`findElementWithClass: There is more than one element with class ${className}.\n\n` +
			JSON.stringify(result)
		);
	}

	if (result.length == 0 || result[0] === undefined) {
		throw new Error(
			`findElementWithClass: The node with className "${className}" could not be found.\n\n` +
			JSON.stringify(result)
		);
	}

	return result[0] as HTMLElement;
}

// https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
export function getScrollAmount(el?: HTMLElement | null): number {
	clientOnly();
	if (el) {
		// console.log(el, el.scrollTop, el.scrollHeight);
		return el.scrollTop / el.scrollHeight
	}
	return document.body.scrollTop / document.body.scrollHeight;
}
