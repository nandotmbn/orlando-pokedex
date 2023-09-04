import PokemonCardsAbilities from "@/components/PokemonCards/partials/PokemonCardsAbilities";
import React from "react";

interface IAboutTab {
	dictionary: any;
	description: string;
	height: number;
	weight: number;
	abilities: any[];
}

function AboutTab({
	dictionary,
	abilities,
	description,
	height,
	weight,
}: IAboutTab) {
	return (
		<div className="w-full text-gray-700 dark:text-white">
			<div className="w-full md:w-6/12">
				<PokemonCardsAbilities abilities={abilities} />
			</div>
			<p className="">{description}</p>

			<div className="mt-3">
				<h3 className="text-bold font-semibold text-xl">
					{dictionary?.detailPage?.basic}
				</h3>
				<div className="flex flex-col gap-1">
					<div className="flex flex-row gap-4">
						<label htmlFor="weight">{dictionary?.detailPage?.weight} :</label>
						<p id="weight">{weight}</p>
					</div>
					<div className="flex flex-row gap-4">
						<label htmlFor="height">{dictionary?.detailPage?.height} :</label>
						<p id="height">{height}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AboutTab;
