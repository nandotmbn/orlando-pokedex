/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import ToogleFavourite from "@/components/ToogleFavourite/ToogleFavourite";
import colourNameToHex from "@/constants/name-color.toHex.constants";
import { getPokemonDetailApi, PokemonService } from "@/services";
import DetailTabs from "@/views/pokemon-detail/partials/DetailTabs/DetailTabs";
import EvolutionSelector from "@/views/pokemon-detail/partials/EvolutionSelector";
import GeneralInfo from "@/views/pokemon-detail/partials/GeneralInfo";
import { useQuery } from "@tanstack/react-query";
import hexToRgba from "hex-to-rgba";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IDetailComparison {
	dictionary: any;
	pokeName: string;
}

function DetailComparison({ dictionary, pokeName }: IDetailComparison) {
	const pathname = usePathname().split("/");
	const locale = pathname[1];
	const [name, setName] = useState(pokeName);

	const pokemonData = useQuery(["detail", pokeName], () => {
		return PokemonService.getByNamePokemons({ name: pokeName, isNotify: false });
	});

	const pokemonDataGql = useQuery(["detail-pokemon-gql", [pokeName]], () => {
		return getPokemonDetailApi(pokeName);
	});

	const pokemon = pokemonDataGql?.data?.pokemons[0];

	const pokemonSpeciesData = useQuery([`species`, pokeName], () => {
		return PokemonService.getSpeciesByNamePokemons({
			isNotify: false,
			name: pokeName,
		});
	});

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
				className="w-11/12 rounded-xl border-2 p-4"
			>
				<EvolutionSelector
					isFetchingNew={pokemonData.isLoading || pokemonSpeciesData.isLoading}
					dictionary={dictionary}
					handleChange={(props: any) => {
						setName(props);
					}}
					name={pokeName}
					pokemonDataGql={pokemonDataGql}
				/>

				<GeneralInfo
					name={pokeName}
					pokemonData={pokemonData}
					pokemonImg={pokemonImg}
				/>

				<div className="flex flex-row w-full items-end justify-end">
					<ToogleFavourite
						dictionary={dictionary}
						name={pokeName}
					/>
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

export default DetailComparison;
