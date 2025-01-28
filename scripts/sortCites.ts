import { readFileSync, writeFileSync } from "fs";
import { Cities } from "../src/cities";
console.log("Sorting cities alphabetically...");
const cityNames = Cities.filter(name => name !== "All" && name !== "Digital First").sort().map(name => `"${name}"`);
writeFileSync("./src/cities.ts", `export const Cities = [\n${[
	`"All"`,
	`"Digital First"`,
	...cityNames
].map(name => "	" + name).join(",\n")}\n] as const`)
