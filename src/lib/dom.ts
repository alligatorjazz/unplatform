export function clientOnly() {
  if (!document) {
    console.trace();
    throw new Error(
      "A frontend-only function was called when `document` did not exist..",
    );
  }
}

export function getNode(className: string) {
  clientOnly();

  const result = document.getElementsByClassName(className);

  if (result.length > 1) {
    throw new Error(
      `findElementWithClass: There is more than one element with class ${className}.\n\n` +
        JSON.stringify(result),
    );
  }

  if (result.length == 0 || result[0] === undefined) {
    throw new Error(
      `findElementWithClass: The node with className "${className}" could not be found.\n\n` +
        JSON.stringify(result),
    );
  }

  return result[0] as HTMLElement;
}

// https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
export function getScrollAmount(): number {
  clientOnly();
  const h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";

  const result = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight);
  return result;
}

export function getCSSVariable(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(
    "--" + variable,
  );
}

export function toSentenceCase(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}

export function toTitleCase(input: string): string {
  if (!input) return input;
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function observeClassChange(
  targetElement: Element,
  callback: () => void,
) {
  // Create a new MutationObserver
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      // Check if the mutation type is 'attributes' (class name change)
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        // Trigger the callback function with the new class names
        callback();
      }
    }
  });

  // Configure the MutationObserver to observe attribute changes on the target element
  observer.observe(targetElement, { attributes: true });

  // Return the observer so it can be disconnected later if needed
  return observer;
}
