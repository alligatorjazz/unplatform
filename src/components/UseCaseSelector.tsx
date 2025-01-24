import { useEffect, useState, type HTMLAttributes, type ReactElement, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { loadUseCases, useCases, type ArrayElement, type UseCaseValues } from "../lib";


export default function UseCaseSelector(props: HTMLAttributes<HTMLFormElement>) {
	const { register, watch } = useForm<UseCaseValues>({
		defaultValues: loadUseCases() ?? {
			"community": false,
			"events": false,
			"expression": false,
			"news": false
		}
	});

	const currentUseCases = watch();

	useEffect(() => {
		localStorage.setItem("useCases", JSON.stringify(currentUseCases));
	}, [currentUseCases]);

	return (
		<form  {...props}>
			<fieldset className="ml-4">
				{useCases.map((useCase, index) => (
					<div key={index} className="flex items-center gap-2">
						<input type="checkbox" id={useCase.name} {...register(useCase.name)} value={useCase.name} />
						<label htmlFor={index.toString()}>{useCase.labelText}</label>
					</div>
				))}
			</fieldset>
		</form>

	);
}