/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

"use client";

import PokemonCards from "@/components/PokemonCards/PokemonCards";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

interface IFavouriteViews {
	dictionary: any;
}

function FavouriteViews({ dictionary }: IFavouriteViews) {
	const [pokemonListFav, setPokemonListFav] = useState<string[]>([]);

	const getStateFav = () => {
		const fav: any[] = JSON.parse(localStorage?.favourites);
		setPokemonListFav(fav);
	};

	const memSetPokemonListFav = (list: string[]) => {
		setPokemonListFav(list);
	};

	useEffect(() => {
		if (!localStorage.favourites) {
			localStorage.setItem("favourites", JSON.stringify([]));
		}

		getStateFav();
	}, []);

	useEffect(() => {}, [pokemonListFav]);

	return (
		<main className="bg-white dark:bg-gray-900 min-h-screen">
			<div className="flex flex-row items-center justify-center w-10/12 m-auto py-8 gap-2 border-b-2 border-black dark:border-white">
				<h2 className="text-2xl font-semibold dark:text-white ">
					{dictionary?.favourite?.title}
				</h2>
			</div>

			<div id="poke-list" className="">
				<div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 lg:w-10/12 xl:w-8/12 m-auto mt-8 pb-16">
						{pokemonListFav.map((name: string, i: number) => {
							return (
								<PokemonCards
									directNameList={pokemonListFav}
									setDirectNameList={memSetPokemonListFav}
									isSelecting={false}
									willCompare={[]}
									setCompare={() => {}}
									dictionary={dictionary}
									ref={undefined}
									key={i}
									pokemonData={{ name: name }}
								/>
							);
						})}
					</div>
					{!pokemonListFav.length && (
						<div className="w-11/12 lg:w-10/12 xl:w-8/12 m-auto mt-8 pb-16 h-44 text-gray-700 dark:text-gray-400 text-center">
							<p className="text-center text-2xl">{dictionary.favourite.empty}</p>

              <Link href="/">
                <p className="px-4 py-1 bg-gray-600 text-white underline">{dictionary.favourite.back}</p>
              </Link>
						</div>
					)}
				</div>
			</div>
		</main>
	);
}

export default FavouriteViews;
