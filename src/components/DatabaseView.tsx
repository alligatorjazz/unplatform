import type { CollectionEntry } from "astro:content";
import { useCallback, useMemo, useState, type FormEvent } from "react";
import { FiGlobe, FiMonitor } from "react-icons/fi";
import { toTitleCase } from "../lib/dom";
import { Cities, OperatingSystems, RecommendationCategories, type City, type LiteracyLevel, type OperatingSystem, type RecommendationCategory } from "../types";
import { loadLiteracyLevel, saveLiteracyLevel } from "../lib";
import { useForm } from "react-hook-form";
import { PiCityFill } from "react-icons/pi";
import { FiRss } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FiList } from "react-icons/fi";
import { ImWindows } from "react-icons/im";
import { SiAndroid, SiIos, SiLinux, SiMacos } from "react-icons/si";
export interface DatabaseViewOptions {
	freeOnly: boolean;
	category: RecommendationCategory;
	maxComplexity: LiteracyLevel;
	city: City;
	requireRSS: boolean;
	requireNewsletter: boolean;
	os: OperatingSystem;
}

export interface DatabaseViewProps {
	title: string;
	entries: CollectionEntry<"recommendations">[];
	defaultOptions?: Partial<DatabaseViewOptions>;
	hideOptions?: Record<keyof DatabaseViewOptions, boolean>;
}

export default function DatabaseView({ title, entries, defaultOptions, hideOptions }: DatabaseViewProps) {
	const { register, watch, reset } = useForm<DatabaseViewOptions>({
		defaultValues: {
			freeOnly: false,
			category: "all",
			maxComplexity: loadLiteracyLevel() ?? "4",
			city: "All",
			os: "all",
			requireRSS: false,
			requireNewsletter: false,
			...defaultOptions
		}
	});

	const filters = watch();
	const resetFilters = useCallback(() => {
		reset({
			freeOnly: false,
			category: "all",
			maxComplexity: "4",
			os: "all",
			city: "All",
			requireRSS: false,
			requireNewsletter: false,
		});
		saveLiteracyLevel("4");
	}, []);

	const filteredEntries = useMemo(() => {
		let result = entries;
		if (filters.freeOnly) {
			result = result.filter(({ data }) => data.pricing.includes("free"))
		}

		if (filters.category !== "all") {
			result = result.filter(({ data }) => data.category.includes(filters.category))
		}

		if (filters.os !== "all") {
			result = result.filter(({ data }) => data.os.includes(filters.os))
		}

		if (filters.maxComplexity !== "4") {
			const maxLevel = parseInt(filters.maxComplexity);
			result = result.filter(({ data }) => parseInt(data.literacyLevel) <= maxLevel)
		}

		if (filters.city !== "All") {
			result = result.filter(({ data }) => data.city === filters.city)
		}

		if (filters.requireNewsletter) {
			result = result.filter(({ data }) => data.feeds?.includes("Newsletter"))
		}

		if (filters.requireRSS) {
			result = result.filter(({ data }) => data.feeds?.includes("RSS"))
		}

		console.log(result);

		result = result.sort((a, b) => a.data.title.localeCompare(b.data.title));
		return result;
	}, [filters]);

	return (
		<section className="w-full rounded-md border border-textColor mb-4">
			<div className="p-4 border-b border-textColor w-full flex items-center gap-4">
				<h1 className="font-bold">{title}</h1>
				{filteredEntries.length < entries.length && Object.values(hideOptions ?? {}).find(hidden => !hidden) && <p className="italic text-xs">{entries.length - filteredEntries.length} items hidden due to filters.</p>}
			</div>
			<div className="max-h-96 min-h-96 overflow-y-scroll scrollbar-none flex flex-col-reverse md:flex-row">
				<ul className="border-textColor flex-1">
					{filteredEntries.map(({ data }) => (
						<li key={data.url}>
							<a target="_blank" className="p-4 block w-full h-full border-b border-textColor no-underline cursor-pointer hover:brightness-150 hover:backdrop-brightness-125 will-change-auto" href={data.url}>
								<div className="w-full flex justify-between items-center">
									<h2 className="text-sm mb-1 font-bold">{data.title}</h2>
									<div title={data.literacyLevel} className="flex flex-1 items-center justify-end gap-2">
										<div className="flex flex-1 items-center gap-2 mb-1 mx-2">
											{data.feeds?.includes("Newsletter") && <FiMail size={16} className="stroke-textColor" />}
											{data.feeds?.includes("RSS") && <FiRss size={16} className="stroke-textColor" />}
										</div>
										{data.city != "All" && data.city != "Digital First" &&
											<h3 className="fill-textColor text-xs flex gap-1 items-center mr-1">
												<span>{(data.city).split(",")[0]} </span>
												<PiCityFill className="stroke-accentColor" />
											</h3>
										}
										<div className="flex items-center gap-1">
											<h3 className="text-xs hidden md:block">Complexity</h3>
											{[0, 1, 2, 3, 4].map(iconLevel => {
												if (iconLevel > parseInt(data.literacyLevel)) {
													return <FiMonitor key={iconLevel} size={12} className="stroke-textColor opacity-25" />
												} else {
													return <FiMonitor key={iconLevel} size={12} className="stroke-textColor" />
												}
											})}
										</div>
									</div>
								</div>
								<h3 className="text-xs mb-2">{data.headline}</h3>
								<div className="flex gap-2 text-xs items-center">
									<ul className="flex items-center gap-2">
										{data.os?.includes("web") && <FiGlobe size={16} className="stroke-textColor" />}
										{data.os?.includes("windows") && <ImWindows size={16} className="invert" />}
										{data.os?.includes("mac") && <SiMacos  size={24} className="invert" />}
										{data.os?.includes("ios") && <SiIos size={16} className="invert" />}
										{data.os?.includes("linux") && <SiLinux size={16} className="invert" />}
										{data.os?.includes("android") && <SiAndroid size={16} className="invert" />}
									</ul>
									<div className="h-4 border-l border-textColor"></div>
									<h4 className="italic">{data.category.map(text => toTitleCase(text)).join(", ")}</h4>
									<div className="h-4 border-l border-textColor"></div>
									<ul className="flex gap-2">
										{data.pricing.map(tier => {
											if (tier === "free") {
												return <li key={tier} className="bg-yellow-400 text-bgColor px-1 h-min">Free</li>
											}
											if (tier === "paid") {
												return <li key={tier} className="bg-accentColor text-bgColor px-1 h-min">Paid</li>
											}
										})}
									</ul>
								</div>
							</a>
						</li>
					))}
				</ul>
				<form className="text-xs flex flex-col p-4 justify-center items-center gap-2 border-b w-full md:sticky md:top-0 md:border-b-0 md:max-w-52 md:border-l">
					{!hideOptions?.freeOnly && <div className="flex items-center gap-1">
						{/* TODO: figure out a way to align these without this ugly pixel-width */}
						<input className="h-[15.5px]" type="checkbox" {...register("freeOnly")} />
						<label htmlFor="freeOnly">Free Options Only</label>
					</div>}
					{!hideOptions?.maxComplexity && <div className="flex items-center gap-1">
						<select {...register("maxComplexity")} className="text-bgColor">
							{["0", "1", "2", "3", "4"].map(level => (
								<option key={level} value={level}>{parseInt(level) + 1}</option>
							))}
						</select>
						<label htmlFor="maxComplexity">Max Complexity</label>
					</div>}
					{!hideOptions?.category && <div className="flex items-center gap-1">
						<label htmlFor="category" title="Category"><FiList className="stroke-textColor" /></label>
						<select {...register("category")} className="text-bgColor">
							{RecommendationCategories.map(category => (
								<option key={category} value={category}>{toTitleCase(category)}</option>
							))}
						</select>
					</div>}
					{!hideOptions?.os && <div className="flex items-center gap-1">
						<label htmlFor="os" title="os">OS</label>
						<select {...register("os")} className="text-bgColor">
							{OperatingSystems.map(system => (
								<option key={system} value={system}>{system === "ios" ? "iOS" : toTitleCase(system)}</option>
							))}
						</select>
					</div>}
					{!hideOptions?.city && <div className="flex items-center gap-1">
						<label htmlFor="city" title="City"><PiCityFill className="fill-textColor" /></label>
						<select {...register("city")} className="text-bgColor">
							{Cities.map(city => (
								<option key={city} value={city}>{city}</option>
							))}
						</select>
					</div>}
					{!hideOptions?.requireRSS && <div className="flex items-center gap-1">
						{/* TODO: figure out a way to align these without this ugly pixel-width */}
						<input className="h-[15.5px]" type="checkbox" {...register("requireRSS")} />
						<label htmlFor="requireRSS" className="flex items-center gap-1">
							<FiRss className="stroke-textColor" /><span>Require RSS Feed</span>
						</label>
					</div>}
					{!hideOptions?.requireNewsletter && <div className="flex items-center gap-1">
						{/* TODO: figure out a way to align these without this ugly pixel-width */}
						<input className="h-[15.5px]" type="checkbox" {...register("requireNewsletter")} />
						<label htmlFor="requireNewsletter" className="flex items-center gap-1">
							<FiMail className="stroke-textColor" /><span>Require Newsletter</span>
						</label>
					</div>}
					<button type="button" onPointerDown={resetFilters} className="p-4 py-2 bg-accentColor text-bgColor transition-all hover:brightness-125 h-min w-min whitespace-nowrap">{">: "}Reset Filters</button>
				</form>
			</div>
		</section>
	);
}