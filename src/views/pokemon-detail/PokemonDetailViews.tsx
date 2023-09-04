/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import ToogleFavourite from "@/components/ToogleFavourite/ToogleFavourite";
import colourNameToHex from "@/constants/name-color.toHex.constants";
import { getPokemonDetailApi, PokemonService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import hexToRgba from "hex-to-rgba";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import DetailTabs from "./partials/DetailTabs/DetailTabs";
import EvolutionSelector from "./partials/EvolutionSelector";
import GeneralInfo from "./partials/GeneralInfo";

interface IPokemonDetailViews {
	dictionary: any;
}

function PokemonDetailViews({ dictionary }: IPokemonDetailViews) {
	const pathname = usePathname().split("/");
	const locale = pathname[1];
	const [name, setName] = useState(pathname[3]);

	const pokemonData = useQuery(["detail", name], () => {
		return PokemonService.getByNamePokemons({ name, isNotify: false });
	});

	const pokemonDataGql = useQuery(["detail-pokemon-gql"], () => {
		return getPokemonDetailApi(name);
	});

	const pokemon = pokemonDataGql?.data?.pokemons[0];

	const pokemonSpeciesData = useQuery(
		[`species:${pokemon?.name}`, name],
		() => {
			return PokemonService.getSpeciesByNamePokemons({
				isNotify: false,
				name: pokemon?.name,
			});
		}
	);

	const pokemonImg =
		pokemonData?.data?.sprites?.other["official-artwork"].front_default;

	const pokemonColor =
		pokemonSpeciesData?.data?.color?.name == "white"
			? "gray"
			: pokemonSpeciesData?.data?.color?.name;

	useEffect(() => {}, [name]);

	return (
		<div className="w-full bg-white dark:bg-gray-900 flex items-center justify-center py-8">
			<div
				style={{
					backgroundColor: hexToRgba(
						colourNameToHex(pokemonColor) ?? "FFFFFF",
						0.4
					),
					borderColor: hexToRgba(colourNameToHex(pokemonColor) ?? "FFFFFF", 1),
				}}
				className="w-11/12 md:w-9/12 lg:w-8/12 rounded-xl border-2 p-4"
			>
				<EvolutionSelector
					isFetchingNew={pokemonData.isLoading || pokemonSpeciesData.isLoading}
					dictionary={dictionary}
					handleChange={(props: any) => {
						setName(props);
					}}
					name={name}
					pokemonDataGql={pokemonDataGql}
				/>

				<GeneralInfo
					name={name}
					pokemonData={pokemonData}
					pokemonImg={pokemonImg}
				/>

				<div className="flex flex-row w-full items-end justify-end">
					<ToogleFavourite dictionary={dictionary} name={pokemonData?.data?.name} />
				</div>

				<DetailTabs
					dictionary={dictionary}
					pokemonData={pokemonData}
					pokemonDataGql={pokemonDataGql}
					pokemonSpeciesData={pokemonSpeciesData}
				/>
			</div>
		</div>
	);
}

export default PokemonDetailViews;
