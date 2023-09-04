/* eslint-disable @next/next/no-img-element */
import { PokemonService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function PokemonSmallCards({ name }: { name: string }) {
	const pokemon = useQuery(["small-cards", name], () => {
		return PokemonService.getByNamePokemons({ isNotify: false, name });
	});

	const pokemonImg =
		pokemon?.data?.sprites?.other["official-artwork"]?.front_default;
	const pokemonId =
		pokemon?.data?.id

	return (
		<div className="flex w-full py-2 flex flex-col items-center justify-center">
			<div className="h-44">
				<img
					className="object-cover object-center h-full"
					src={pokemonImg}
					alt={name}
				/>
			</div>
      <p className="text-xl font-bold dark:text-white">#{pokemonId}</p>
      <p className="text-2xl font-bold dark:text-white capitalize">{name.split("-").join(" ")}</p>
		</div>
	);
}

export default PokemonSmallCards;
