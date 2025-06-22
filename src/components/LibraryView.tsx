import type { CollectionEntry } from "astro:content";

export interface LibraryViewProps {
	title: string;
	entries: CollectionEntry<"library">[];
}

export default function LibraryView({ title, entries }: LibraryViewProps) {
	return (
		<section className="w-full rounded-md border border-text mb-4 database-view">
			<div className="p-4 border-b border-text w-full flex items-center gap-4">
				<h1 className="font-bold text-xl">Library</h1>
			</div>
			<div className="max-h-96 min-h-96 overflow-y-scroll scrollbar-none flex flex-col-reverse md:flex-row">
				<ul className="border-text md:border-r h-full flex-1">
					{entries
						.sort(
							(a, b) =>
								(b.data.priority ?? 0) - (a.data.priority ?? 0)
						)
						.map(({ data }) => (
							<li key={data.url}>
								<article className="p-4 block w-full h-full border-b border-text hover:brightness-150 hover:backdrop-brightness-125 will-change-auto">
									<a
										className="w-full h-full no-underline cursor-pointer"
										href={data.url}
										target="_blank"
									>
										<div className="w-full flex justify-between items-center">
											<h2 className="text-sm mb-1 font-bold">
												{data.title}
											</h2>
										</div>
										<h3 className="text-xs mb-2">
											{data.author}
										</h3>
										<div className="flex gap-2 text-xs items-center">
											<p>{data.headline}</p>
										</div>
									</a>
								</article>
							</li>
						))}
				</ul>
			</div>
		</section>
	);
}
