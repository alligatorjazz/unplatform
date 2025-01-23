import { useState, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { useForm } from "react-hook-form";

export type LiteracyLevel = "0" | "1" | "2" | "3" | "4";
export default function TechLiteracySelector(props: HTMLAttributes<HTMLFormElement>) {
	const { register } = useForm<{ literacyLevel: string }>();

	const [level, setLevel] = useState<LiteracyLevel>("0");

	const literacyLevels: (string | ReactElement)[] = [
		"I can just barely operate a web browser.",
		"I know what a .zip file is, and what it's used for.",
		`I know what happens if I type "%appdata%" into Windows Explorer.`,
		"I've dabbled with HTML / CSS (or other programming / markup languages).",
		<a target="_blank" href="https://www.youtube.com/watch?v=fBDifUjNzbQ">"I don't even see the code."</a>
	];
	return (
		<form  {...props}>
			<fieldset className="ml-4">
				{literacyLevels.map((content, index) => (
					<div key={index.toString()} className="flex items-center gap-2">
						<input type="radio" id={index.toString()} {...register("literacyLevel")} value={index.toString()} />
						<label htmlFor={index.toString()}>{content}</label>
					</div>
				))}
			</fieldset>
		</form>

	);
}