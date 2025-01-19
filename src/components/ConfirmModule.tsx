import { useEffect, useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { ReactPrompt } from "./ReactPrompt";
import { newsletterConfirm } from "../utils/api";

type ConfirmStatus = "loading" | "completed" | "failed";
export function ConfirmModule() {
	const [status, setStatus] = useState<ConfirmStatus>("loading");
	const [message, setMessage] = useState("Confirming subscription...");

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const code = params.get("code");
		if (!code) {
			window.location.replace("/");
		} else {
			newsletterConfirm(code)
				.then(({ ok, message }) => {
					if (ok) {
						setStatus("completed")
					} else {
						setStatus("failed")
					}

					setMessage(message);
				})
				.catch(err => {
					console.error(err);
					setStatus("failed")
				})
				.finally(() => setTimeout(() => {
					window.location.replace("/latest");
				}, 1000 * 5))
		}

	}, [status]);

	return (
		<div className="w-full h-full flex flex-col gap-4 items-center justify-center text-center p-8">
			{status === "loading" && <>
				<ReactPrompt className="md:text-xl">{message}</ReactPrompt>
				<LoadingIndicator />
			</>}
			{status === "failed" && <>
				<ReactPrompt className="md:text-xl text-red-500">{message}</ReactPrompt>
				<ReactPrompt>If you're still having trouble after that, shoot an email to support@falchionstudios.com.</ReactPrompt>
				<a href="/" className="bg-fgColor px-4 py-2 hover:bg-accent"><ReactPrompt>Back to Home</ReactPrompt></a>
			</>}
			{status === "completed" && <>
				<ReactPrompt className="md:text-xl text-green-500">{message}</ReactPrompt>
			</>}
		</div >
	);
}