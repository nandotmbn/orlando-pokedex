"use client";

import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonService } from "@/services";
import { useInView } from "react-intersection-observer";
import PokemonCards from "@/components/PokemonCards/PokemonCards";

interface IPokeListPanel {
	dictionary: any;
}

function PokeListPanel({ dictionary }: IPokeListPanel) {
	const LIMIT = 10;
	const { ref, inView } = useInView();

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			["pokemons"],
			({ pageParam = 0 }) => {
				return PokemonService.getPokemons({
					limit: 10,
					offset: 10 * pageParam,
					isNotify: false,
				});
			},
			{
				getNextPageParam: (lastPage, allPages) => {
					const nextPage =
						lastPage.results.length === LIMIT ? allPages.length + 1 : undefined;
					return nextPage;
				},
			}
		);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage]);

	return (
		<div className="grid grid-cols-2 gap-8 w-8/12 m-auto mt-8">
			{data?.pages.map((page) =>
				page.results.map((poke: any, i: number) => {
					return (
						<PokemonCards
							ref={page.results.length === i + 1 ? ref : undefined}
							key={i}
              pokemonData={poke}
						/>
					);
				})
			)}
		</div>
	);
}

export default PokeListPanel;
