import { useCallback, useEffect, useRef, useState } from "react";
import type { City } from "../types";

export function CitySwitcher({ data, timeout }: { data: City[] | City, timeout: number }) {
	const [activeCity, setActiveCity] = useState<number>(0);
	const multiRef = useRef<HTMLSpanElement>(null);
	const shiftActiveCity = useCallback(() => {
		setTimeout(() => {
			setActiveCity(prev => prev === data.length - 1 ? 0 : prev + 1);
			multiRef?.current?.setAttribute("style", "opacity: 1");
			setTimeout(() => {
				shiftActiveCity();
				multiRef?.current?.setAttribute("style", "opacity: 0")
			}, timeout)
		}, 300)
	}, []);

	useEffect(() => {
		if (Array.isArray(data)) {
			shiftActiveCity();
		}
	}, [])

	if (!Array.isArray(data)) {
		return <span>{data.split(", ")[0]}</span>
	}

	return (
		<span ref={multiRef} className="opacity-0 transition-opacity">
			{data[activeCity].split(", ")[0]} <span className="hidden md:inline">`$ + {data.length - 1}`</span>
		</span>
	);
}