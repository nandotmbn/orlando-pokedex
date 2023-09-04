"use client";

import React, { useState, useEffect } from "react";
import DetailComparison from "./partials/DetailComparison/DetailComparison";

interface IComparisonViews {
	dictionary: any;
	searchParams: any;
}

function ComparisonViews({ dictionary, searchParams }: IComparisonViews) {
	const pokemons = searchParams?.pokemon?.split(",");

	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-between items-start bg-gray-900`}
		>
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
