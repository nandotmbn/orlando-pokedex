import React from "react";
import { Select, Tabs, TabsProps } from "antd";
import AboutTab from "./partials/AboutTab";
import StatTab from "./partials/StatTab";
import EvolutionTab from "./partials/EvolutionTab";

interface IDetailTabs {
	dictionary: any;
	pokemonData: any;
	pokemonDataGql: any;
	pokemonSpeciesData: any;
}

function DetailTabs({
	dictionary,
	pokemonData,
	pokemonDataGql,
	pokemonSpeciesData,
}: IDetailTabs) {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: (
				<p className="text-lg font-semibold text-gray-600 dark:text-white">
					About
				</p>
			),
			children: (
				<AboutTab
					abilities={pokemonData?.data?.abilities}
					description={pokemonDataGql?.data?.flavorText[0]?.flavorText}
          height={pokemonData?.data?.height}
          weight={pokemonData?.data?.weight}
					dictionary={dictionary}
				/>
			),
		},
		{
			key: "2",
			label: (
				<p className="text-lg font-semibold text-gray-600 dark:text-white">
					Stats
				</p>
			),
			children: <StatTab stats={pokemonData?.data?.stats} />,
		},
		{
			key: "3",
			label: (
				<p className="text-lg font-semibold text-gray-600 dark:text-white">
					Evolutions
				</p>
			),
			children: <EvolutionTab evolution={pokemonDataGql?.data?.evolutions?.species} />,
		},
	];

	return <Tabs defaultActiveKey="1" items={items} />;
}

export default DetailTabs;
