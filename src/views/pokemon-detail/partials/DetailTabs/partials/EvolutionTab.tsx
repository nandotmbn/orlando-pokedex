/* eslint-disable @next/next/no-img-element */
import PokemonSmallCards from "@/components/PokemonSmallCards/PokemonSmallCards";
import React from "react";

function EvolutionTab({ evolution }: { evolution: any[] }) {
	return (
		<div className="flex flex-col gap-4">
			{evolution?.map((ev: any, index: number) => {
				return (
					<PokemonSmallCards key={index} name={ev.name} />
				);
			})}
		</div>
	);
}

export default EvolutionTab;
