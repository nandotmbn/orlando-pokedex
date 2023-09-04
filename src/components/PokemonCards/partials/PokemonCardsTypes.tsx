import TypeTag from "@/components/TypeTag/TypeTag";
import pokemonColorTypeConverter from "@/constants/type-color.pokemon.constants";
import hexToRgba from "hex-to-rgba";
import React from "react";

function PokemonCardsTypes({types}: {types: any[]}) {
	return (
		<div className="grid grid-cols-2 gap-2">
			{types?.map((type: any, i: number) => {
				return (
					<TypeTag name={type?.type?.name} key={i}/>
				);
			})}
		</div>
	);
}

export default PokemonCardsTypes;
