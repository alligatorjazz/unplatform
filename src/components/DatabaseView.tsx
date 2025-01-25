import type { CollectionEntry } from "astro:content";
import { useMemo, useState } from "react";
import { FiMonitor } from "react-icons/fi";
import { toTitleCase } from "../lib/dom";
import { RecommendationCategories, type LiteracyLevel, type RecommendationCategory } from "../types";
import { loadLiteracyLevel } from "../lib";
import { useForm } from "react-hook-form";

export interface DatabaseViewOptions {
	freeOnly: boolean;
	category: RecommendationCategory | null;
	maxComplexity: LiteracyLevel
}

export interface DatabaseViewProps {
	title: string;
	entries: CollectionEntry<"recommendations">[];
	defaultOptions?: Partial<DatabaseViewOptions>;
	hideOptions?: Record<keyof DatabaseViewOptions, boolean>;
}

export default function DatabaseView({ title, entries, defaultOptions, hideOptions }: DatabaseViewProps) {
	const { register, watch } = useForm<DatabaseViewOptions>({
		defaultValues: {
			freeOnly: false,
			category: "all",
			maxComplexity: loadLiteracyLevel() ?? "4",
			...defaultOptions
		}
	});

	const filteredEntries = useMemo(() => {
		return entries;
	}, []);

	return (
		<section className="w-full rounded-md border border-textColor">
			<div className="p-4 border-b border-textColor w-full flex flex-col">
				<h1 className="font-bold text-center">{title}</h1>

			</div>
			<div className="max-h-96 overflow-y-scroll flex flex-col-reverse md:flex-row">
				<ul>
					{entries.map(({ data }) => (
						<li key={data.url} className="border-r border-textColor">
							<a target="_blank" className="p-4 block w-full h-full border-b border-textColor no-underline cursor-pointer hover:brightness-150 hover:backdrop-brightness-125 will-change-auto" href={data.url}>
								<div className="w-full flex justify-between items-center">
									<h2 className="md:text-lg">{data.title}</h2>
									<div title={data.literacyLevel} className="flex items-center gap-1">
										<h3 className="text-xs">Complexity</h3>
										{[0, 1, 2, 3, 4].map(iconLevel => {
											if (iconLevel > parseInt(data.literacyLevel)) {
												return <FiMonitor key={iconLevel} size={12} className="stroke-textColor opacity-25" />
											} else {
												return <FiMonitor key={iconLevel} size={12} className="stroke-textColor" />
											}
										})}
									</div>
								</div>
								<h3 className="text-xs md:text-sm mb-2">{data.headline}</h3>
								<div className="flex gap-2 text-xs items-center">
									<h4>{data.category.map(text => toTitleCase(text)).join(", ")}</h4>
									<div className="h-4 border-l border-textColor"></div>
									<ul className="flex  gap-2">
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
				<form className="text-xs h-full border-b border-textColor md:border-b-0 md:sticky top-1/3 whitespace-nowrap p-4 flex flex-wrap justify-center gap-2 min-w-48 flex-1">
					<div className="flex items-center gap-1">
						<input type="checkbox" {...register("freeOnly")} />
						<label htmlFor="freeOnly">Free Options Only</label>
					</div>
					<div className="flex items-center gap-1">
						<select {...register("maxComplexity")} className="text-bgColor">
							{["0", "1", "2", "3", "4"].map(level => (
								<option key={level} value={level}>{parseInt(level) + 1}</option>
							))}
						</select>
						<label htmlFor="maxComplexity">Max Complexity</label>
					</div>
					<div className="flex flex-row-reverse md:flex-col items-center gap-1">
						<label htmlFor="category">Category</label>
						<select {...register("category")} className="text-bgColor">
							{RecommendationCategories.map(category => (
								<option key={category} value={category}>{toTitleCase(category)}</option>
							))}
						</select>
					</div>
				</form>
			</div>
		</section>
	);
}