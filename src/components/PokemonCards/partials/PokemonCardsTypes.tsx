import pokemonColorTypeConverter from "@/constants/type-color.pokemon.constants";
import hexToRgba from "hex-to-rgba";
import React from "react";

function PokemonCardsTypes({types}: {types: any[]}) {
	return (
		<div className="grid grid-cols-2 gap-2">
			{types?.map((type: any, i: number) => {
				const color = pokemonColorTypeConverter(type?.type?.name);
				return (
					<div
						key={i}
						style={{
							backgroundColor: hexToRgba(color, 1),
						}}
						className="py-1 rounded-full"
					>
						<p className="text-xxs lg:text-xs capitalize text-center text-white">
							{type?.type?.name?.split("-").join(" ")}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default PokemonCardsTypes;
