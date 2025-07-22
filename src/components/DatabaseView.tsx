import type { CollectionEntry } from "astro:content";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiGlobe, FiList, FiMail, FiMonitor, FiRss } from "react-icons/fi";
import { ImWindows } from "react-icons/im";
import { PiCityFill } from "react-icons/pi";
import { SiAndroid, SiIos, SiLinux, SiMacos } from "react-icons/si";
import { Cities } from "../cities";
import { loadLiteracyLevel, saveLiteracyLevel } from "../lib";
import { toTitleCase } from "../lib/dom";
import {
  OperatingSystems,
  RecommendationCategories,
  type City,
  type LiteracyLevel,
  type OperatingSystem,
  type RecommendationCategory,
} from "../types";
import { CitySwitcher } from "./CitySwitcher";
import { marked } from "marked";
import createDOMPurify from "dompurify";

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
  hideHidden?: boolean;
  localOnly?: boolean;
  categoryConstraints?: RecommendationCategory[];
}

export default function DatabaseView({
  title,
  entries,
  defaultOptions,
  hideOptions,
  hideHidden,
  localOnly,
  categoryConstraints,
}: DatabaseViewProps) {
  const DOMPurify = createDOMPurify(window);
  const { register, watch, reset } = useForm<DatabaseViewOptions>({
    defaultValues: {
      freeOnly: false,
      category: "all",
      maxComplexity: loadLiteracyLevel() ?? "4",
      city: "All",
      os: "all",
      requireRSS: false,
      requireNewsletter: false,
      ...defaultOptions,
    },
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
      ...(defaultOptions ?? {}),
    });

    // GDPR: prevents saving the literacy level if it hasn't already been set
    if (loadLiteracyLevel() && localStorage.getItem("GDPR-check")) {
      saveLiteracyLevel("4");
    }
  }, []);

  const filteredEntries = useMemo(() => {
    let result = entries;
    if (filters.freeOnly) {
      result = result.filter(({ data }) => data.pricing.includes("free"));
    }

    if (filters.category !== "all") {
      result = result.filter(({ data }) =>
        data.category.includes(filters.category),
      );
    }

    if (filters.os !== "all") {
      result = result.filter(({ data }) => data.os.includes(filters.os));
    }

    if (filters.maxComplexity !== "4") {
      const maxLevel = parseInt(filters.maxComplexity);
      result = result.filter(
        ({ data }) => parseInt(data.literacyLevel) <= maxLevel,
      );
    }

    if (filters.city !== "All") {
      result = result.filter(
        ({ data }) =>
          data.city === filters.city ||
          data.city.includes(filters.city as Exclude<City, "Digital First">),
      );
    }

    if (filters.requireNewsletter) {
      result = result.filter(({ data }) => data.feeds?.includes("Newsletter"));
    }

    if (filters.requireRSS) {
      result = result.filter(({ data }) => data.feeds?.includes("RSS"));
    }

    if (localOnly) {
      result = result.filter(({ data }) => data.city !== "Digital First");
    }

    if (categoryConstraints) {
      result = result.filter(({ data }) =>
        data.category.find((category) =>
          categoryConstraints.includes(category),
        ),
      );
    }

    // alphabetical sort without "the"
    result = result.sort((a, b) =>
      a.data.title
        .replace("The ", "")
        .localeCompare(b.data.title.replace("The ", "")),
    );
    return result;
  }, [filters]);

  return (
    <section className="w-full rounded-md border border-text mb-4 database-view">
      <div className="p-4 border-b border-text w-full flex items-center gap-4">
        <h1 className="font-bold">{title}</h1>
        {filteredEntries.length < entries.length && !hideHidden && (
          <p className="italic text-xs">
            {entries.length - filteredEntries.length} items hidden due to
            filters.
          </p>
        )}
      </div>
      <div className="max-h-96 min-h-96 overflow-y-scroll scrollbar-none flex flex-col md:flex-row-reverse overflow-hidden">
        <form className="text-xs flex flex-col p-4 justify-center items-center gap-2 border-b w-full md:sticky md:top-0 md:border-b-0 md:max-w-52 md:border-l">
          {!hideOptions?.freeOnly && (
            <div className="flex items-center gap-1">
              {/* TODO: figure out a way to align these without this ugly pixel-width */}
              <input
                className="h-[15.5px]"
                type="checkbox"
                {...register("freeOnly")}
              />
              <label htmlFor="freeOnly">Free Options Only</label>
            </div>
          )}
          {!hideOptions?.maxComplexity && (
            <div className="flex items-center gap-1">
              <select {...register("maxComplexity")} className="text-bg">
                {["0", "1", "2", "3", "4"].map((level) => (
                  <option className="text-bg" key={level} value={level}>
                    {parseInt(level) + 1}
                  </option>
                ))}
              </select>
              <label htmlFor="maxComplexity">Max Complexity</label>
            </div>
          )}
          {!hideOptions?.category && (
            <div className="flex items-center gap-1">
              <label htmlFor="category" title="Category">
                <FiList className="stroke-text" />
              </label>
              <select {...register("category")} className="text-bg">
                {(categoryConstraints ?? RecommendationCategories).map(
                  (category) => (
                    <option key={category} value={category}>
                      {toTitleCase(category)}
                    </option>
                  ),
                )}
              </select>
            </div>
          )}
          {!hideOptions?.os && (
            <div className="flex items-center gap-1">
              <label htmlFor="os" title="os">
                OS
              </label>
              <select {...register("os")} className="text-bg">
                {OperatingSystems.map((system) => (
                  <option key={system} value={system}>
                    {system === "ios" ? "iOS" : toTitleCase(system)}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!hideOptions?.city && (
            <div className="flex items-center gap-1">
              <label htmlFor="city" title="City">
                <PiCityFill className="fill-text" />
              </label>
              <select {...register("city")} className="text-bg">
                {Cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
          {!hideOptions?.requireRSS && (
            <div className="flex items-center gap-1">
              {/* TODO: figure out a way to align these without this ugly pixel-width */}
              <input
                className="h-[15.5px]"
                type="checkbox"
                {...register("requireRSS")}
              />
              <label htmlFor="requireRSS" className="flex items-center gap-1">
                <FiRss className="stroke-text" />
                <span>Require RSS Feed</span>
              </label>
            </div>
          )}
          {!hideOptions?.requireNewsletter && (
            <div className="flex items-center gap-1">
              {/* TODO: figure out a way to align these without this ugly pixel-width */}
              <input
                className="h-[15.5px]"
                type="checkbox"
                {...register("requireNewsletter")}
              />
              <label
                htmlFor="requireNewsletter"
                className="flex items-center gap-1"
              >
                <FiMail className="stroke-text" />
                <span>Require Newsletter</span>
              </label>
            </div>
          )}
          <button
            type="button"
            onPointerDown={resetFilters}
            className="p-4 py-2 bg-accent text-bg transition-all md:hover:brightness-125 h-min w-min whitespace-nowrap"
          >
            {">: "}Reset Filters
          </button>
        </form>
        <ul className="border-text flex-1">
          {filteredEntries.map(({ data, body }) => (
            <li key={data.url}>
              <a
                target="_blank"
                className="p-4 block w-full h-full border-b text-text border-text no-underline cursor-pointer md:hover:backdrop-brightness-125"
                href={data.url}
              >
                <div className="w-full flex justify-between items-center">
                  <h2 className="text-sm mb-1 font-bold">{data.title}</h2>
                  <div
                    title={data.literacyLevel}
                    className="flex flex-1 items-center justify-end gap-2"
                  >
                    <div className="flex flex-1 items-center gap-2 mb-1 mx-2">
                      {data.feeds?.includes("Newsletter") && (
                        <FiMail size={16} className="stroke-text" />
                      )}
                      {data.feeds?.includes("RSS") && (
                        <FiRss size={16} className="stroke-text" />
                      )}
                    </div>
                    {data.city != "All" && data.city != "Digital First" && (
                      <h3 className="fill-text text-xs flex gap-1 items-center mr-1 min-h-10 text-right md:min-h-min">
                        <CitySwitcher data={data.city} timeout={1500} />
                        <PiCityFill className="stroke-accent hidden md:block" />
                      </h3>
                    )}
                    <div className="flex items-center gap-1">
                      <h3 className="text-xs hidden md:block">Complexity</h3>
                      {[0, 1, 2, 3, 4].map((iconLevel) => {
                        if (iconLevel > parseInt(data.literacyLevel)) {
                          return (
                            <FiMonitor
                              key={iconLevel}
                              size={12}
                              className="stroke-text opacity-25"
                            />
                          );
                        } else {
                          return (
                            <FiMonitor
                              key={iconLevel}
                              size={12}
                              className="stroke-text"
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
                <h3
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      marked.parse(body, { async: false }),
                    ),
                  }}
                  className="text-xs mb-2"
                ></h3>
                <div className="flex gap-2 text-xs items-center">
                  <ul className="flex items-center gap-2">
                    {data.os?.includes("web") && (
                      <FiGlobe size={16} className="stroke-text" />
                    )}
                    {data.os?.includes("windows") && (
                      <ImWindows size={16} color="white" />
                    )}
                    {data.os?.includes("mac") && (
                      <SiMacos size={24} color="white" />
                    )}
                    {data.os?.includes("ios") && (
                      <SiIos size={16} color="white" />
                    )}
                    {data.os?.includes("linux") && (
                      <SiLinux size={16} color="white" />
                    )}
                    {data.os?.includes("android") && (
                      <SiAndroid size={16} color="white" />
                    )}
                  </ul>
                  <div className="h-4 border-l border-text"></div>
                  <h4 className="italic">
                    {data.category.map((text) => toTitleCase(text)).join(", ")}
                  </h4>
                  <div className="h-4 border-l border-text"></div>
                  <ul className="flex gap-2">
                    {data.pricing.map((tier) => {
                      if (tier === "free") {
                        return (
                          <li
                            key={tier}
                            className="bg-yellow-400 text-bg px-1 h-min"
                          >
                            Free
                          </li>
                        );
                      }
                      if (tier === "paid") {
                        return (
                          <li
                            key={tier}
                            className="bg-accent text-bg px-1 h-min"
                          >
                            Paid
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
