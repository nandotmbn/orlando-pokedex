import React from "react";

function PokemonCardsAbilities({abilities}: {abilities: any[]}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
			{abilities?.map((ability: any, i: number) => {
				return (
					<div
						key={i}
						className="p-1 rounded-full bg-black text-white dark:invert"
					>
						<p className="text-xxs lg:text-xs capitalize text-center">
							{ability?.ability?.name?.split("-").join(" ")}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default PokemonCardsAbilities;
