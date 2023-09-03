/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { PokemonService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PokemonCards = React.forwardRef(
	({ pokemonData, dictionary }: { pokemonData: { name: string }, dictionary: any }, ref: any) => {
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

		return (
			<div
				style={{ borderColor: pokemonColor }}
				className={`h-72 w-full p-2 rounded-xl saturate-40 border-8 flex flex-row gap-4`}
				ref={ref}
			>
				<div className="flex flex-1">
					<img
						className="object-cover object-center w-full h-auto"
						src={pokemonImg}
						alt={pokemonData.name}
					/>
				</div>
				<div className="flex flex-1 flex-col">
					<h2
						className="uppercase px-4 py-2 text-lg dark:text-gray-100 text-gray-800 font-bold text-center rounded-full border-2"
						style={{ borderColor: pokemonColor }}
					>
						{pokemonData.name}
					</h2>

					<p className="mt-4 text-gray-500 dark:text-white font-semibold text-xl">
						{dictionary.pokemonCards?.abilities}
					</p>
					<div className="grid grid-cols-2 gap-2">
						{abilities?.map((ability: any, i: number) => {
							return (
								<div
									key={i}
									className="p-2 rounded-full bg-black text-white dark:invert"
								>
									<p className="text-xs capitalize text-center">
										{ability?.ability?.name?.split("-").join(" ")}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
);

export default PokemonCards;
