import type { ReactNode } from "react";

export function ReactPrompt({ children, className }: { children: ReactNode, className?: string }) {
	return <div className={["flex", className].join(" ")}>
		<span className={"mr-2 text-inherit"}>{">:"}</span>
		{children}
	</div>
}