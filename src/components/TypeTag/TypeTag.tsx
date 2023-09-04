import pokemonColorTypeConverter from "@/constants/type-color.pokemon.constants";
import hexToRgba from "hex-to-rgba";
import React from "react";

interface ITypeTag {
  name: string,
}

function TypeTag({name}: ITypeTag) {
  const color = pokemonColorTypeConverter(name);
	return (
		<div
			style={{
				backgroundColor: hexToRgba(color, 1),
			}}
			className="py-1 rounded-full"
		>
			<p className="text-xxs lg:text-xs capitalize text-center text-white">
				{name?.split("-").join(" ")}
			</p>
		</div>
	);
}

export default TypeTag;
