/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { PokemonService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import hexToRgba from "hex-to-rgba";
import colourNameToHex from "@/constants/name-color.toHex.constants";
import PokemonCardsTypes from "./partials/PokemonCardsTypes";
import PokemonCardsAbilities from "./partials/PokemonCardsAbilities";
import SelectButton from "./partials/SelectButton";

type TWillCompare = {
	name: string;
	imageUrl: string;
};

interface IPokemonCards {
	pokemonData: { name: string };
	dictionary: any;
	isSelecting: boolean;
	setCompare: (operator: "ADD" | "DELETE", props: TWillCompare) => void;
	willCompare: TWillCompare[];
}

const PokemonCards = React.forwardRef(
	(
		{
			pokemonData,
			dictionary,
			isSelecting,
			setCompare,
			willCompare,
		}: IPokemonCards,
		ref: any
	) => {
		const [isSelected, setSelected] = useState(false);
		const pokemonMainData = useQuery([pokemonData.name], () => {
			return PokemonService.getByNamePokemons({
				isNotify: false,
				name: pokemonData.name,
			});
		});
		const pokemonSpeciesData = useQuery([`species:${pokemonData.name}`], () => {
			return PokemonService.getSpeciesByNamePokemons({
				isNotify: false,
				name: pokemonData.name,
			});
		});

		const pokemonColor =
			pokemonSpeciesData?.data?.color?.name == "white"
				? "gray"
				: pokemonSpeciesData?.data?.color?.name;

		const pokemonImg =
			pokemonMainData?.data?.sprites?.other["official-artwork"].front_default;

		const abilities = pokemonMainData?.data?.abilities;
		const types = pokemonMainData?.data?.types;

		const handleSelection = () => {
			if (isSelected) {
				return setCompare("DELETE", {
					imageUrl: pokemonImg,
					name: pokemonData.name,
				});
			}

			return setCompare("ADD", {
				imageUrl: pokemonImg,
				name: pokemonData.name,
			});
		};

		useEffect(() => {
			let isExist = false;
			willCompare.forEach((val: TWillCompare, i: number) => {
				if (val?.name == pokemonData?.name) {
					return (isExist = true);
				}
			});
			setSelected(isExist);
		}, [pokemonData.name, willCompare]);

		return (
			<div
				style={{
					backgroundColor: hexToRgba(
						colourNameToHex(pokemonColor) ?? "FFFFFF",
						0.2
					),
					borderColor: hexToRgba(colourNameToHex(pokemonColor) ?? "FFFFFF", 1),
				}}
				className={`h-52 w-full p-2 rounded-xl saturate-40 border-2 flex flex-row gap-4`}
				ref={ref}
			>
				<div className="flex flex-1">
					<img
						className="object-cover object-center w-full"
						src={pokemonImg}
						alt={pokemonData?.name}
					/>
				</div>
				<div className="flex flex-1 flex-col justify-between">
					<div>
						<div className="flex flex-row items-center justify-between">
							<p className="mt-4 text-gray-500 dark:text-white font-semibold text-xs">
								#{pokemonMainData?.data?.id}
							</p>
							<h2
								className="uppercase p-1 px-2 text-xs lg:text-lg dark:text-gray-100 text-gray-800 font-bold text-center rounded-full border-2"
								style={{ borderColor: pokemonColor }}
							>
								{pokemonData.name}
							</h2>
						</div>

						<p className="mt-4 text-gray-500 dark:text-white font-semibold text-xs md:text-xl">
							{dictionary.pokemonCards?.abilities}
						</p>
						<PokemonCardsAbilities abilities={abilities} />
					</div>
					<PokemonCardsTypes types={types} />
				</div>

				<SelectButton handleSelection={handleSelection} isSelected={isSelected} isSelecting={isSelecting} />
			</div>
		);
	}
);

export default PokemonCards;
