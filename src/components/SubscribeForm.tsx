import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react"
import { newsletterSignup } from "../utils/api"
import { useForm, type SubmitHandler } from "react-hook-form"
import { LoadingIndicator } from "./LoadingIndicator"
import { ReactPrompt } from "./ReactPrompt"

interface Props extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> { }

function SendSvg() {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>)
}

type Inputs = {
	email: string
}

type FormResult = "idle" | "loading" | "success" | "error"
type FormStatus = { status: FormResult, message?: string };
export function SubscribeForm({ className, ...props }: Props) {
	const [mode, setMode] = useState<FormStatus>({ status: "idle" });
	const {
		register,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors: formErrors }
	} = useForm<Inputs>()
	const onSubmit: SubmitHandler<Inputs> = ({ email }) => {
		setMode({ status: "loading" });
		newsletterSignup(email)
			.then(({ ok, message }) => {
				if (ok) {
					setMode({ status: "success", message })
				} else { setMode({ status: "error", message }) }
			})
			.catch(err => {
				console.error(err); setMode({
					status: "error",
					message: "Whoops! Couldn't sign you up for some reason. Check your network connection and try again - if it still doesn't work, shoot an email to ajazz@fromthesuperhighway.com and I'll add you manually."
				});
			});
	}

	useEffect(() => {
		if (mode.status === "error") {
			setError("root", { message: mode.message })
		} else {
			clearErrors("root")
		}
	}, [mode.status]);

	return (
		<form className={["p-8 flex flex-col items-center gap-2", className].join(" ")} onSubmit={handleSubmit(onSubmit)} {...props}>
			<h1 className="font-bold w-full text-center">{">: "}Subscribe</h1>
			{/* <p>{JSON.stringify(mode)}</p> */}
			<div className={["flex items-center border mb-4 w-full max-w-80", mode.status !== "idle" ? "pointer-events-none opacity-40 select-none" : ""].join(" ")}>
				<span className={"mr-0 px-2 text-inherit"}>{">:"}</span>
				<input
					{...register("email", { required: true })}
					type="email"
					placeholder="your@email.com"
					className="text-bgColor p-1 flex-1"
					disabled={mode.status === "loading"}
				/>
				<button type="submit" className="px-2 fill-textColor">
					<SendSvg />
				</button>
			</div>
			{mode.status === "loading" && <>
				<LoadingIndicator />
				<p className="text-center italic text-sm animate-apparate">{">:"} it might take a little bit... please leave the tab open!</p>
			</>}
			{mode.status === "success" && <ReactPrompt className="text-green-500">{mode.message}</ReactPrompt>}
			{formErrors.email && <ReactPrompt className="text-red-500">{formErrors.email.message}</ReactPrompt>}
			{formErrors.root && <ReactPrompt className="text-red-500">{formErrors.root.message}</ReactPrompt>}
			<div className="flex items-center">
				<p className="text-center">
					...or you can use our <a
						className="font-bold text-accentColor"
						href="/rss.xml">
						RSS feed.
					</a>
				</p>
			</div>
		</form>
	);
}