"use client";

import React from "react";
import DetailComparison from "./partials/DetailComparison/DetailComparison";

interface IComparisonViews {
	dictionary: any;
	searchParams: any;
}

function ComparisonViews({ dictionary, searchParams }: IComparisonViews) {
	const pokemons = searchParams?.pokemon?.split(",");

	const gridControl = `grid grid-cols-1 lg:grid-cols-${pokemons?.length}`;
	return (
		<div className={`${gridControl} justify-between items-start bg-gray-900`}>
			{pokemons.map((poke: string) => {
				return (
					<DetailComparison
						dictionary={dictionary}
						pokeName={poke}
						key={poke}
					/>
				);
			})}
		</div>
	);
}

export default ComparisonViews;
