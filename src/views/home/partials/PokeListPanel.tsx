/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonsApi, PokemonService } from "@/services";
import { useInView } from "react-intersection-observer";
import PokemonCards from "@/components/PokemonCards/PokemonCards";
import { Drawer, FloatButton, message } from "antd";
import {
	FilterOutlined,
	Loading3QuartersOutlined,
	LoadingOutlined,
	MenuOutlined,
	RadarChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import FilterDrawer from "./FilterDrawer";

interface IPokeListPanel {
	dictionary: any;
}

type TWillCompare = {
	name: string;
	imageUrl: string;
};

function PokeListPanel({ dictionary }: IPokeListPanel) {
	const LIMIT = 10;
	const { ref, inView } = useInView();
	const [open, setOpen] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const [isSelecting, setSelecting] = useState<boolean>(false);
	const [willCompare, setWillCompare] = useState<TWillCompare[]>([]);

	const getListPokemon = () => {
		const pokemon: any[] = [];
		willCompare.forEach((data: TWillCompare, index: number) => {
			if (data?.name) return pokemon.push(data?.name);
		});

		return pokemon.join(",");
	};

	const setCompare = (operator: "ADD" | "DELETE", props: TWillCompare) => {
		if (operator == "ADD") {
			let count = 0;
			willCompare.forEach((data: TWillCompare, index: number) => {
				if (data.name) count += 1;
			});

			if (count >= 3) {
				message.warning({
					content: dictionary.pokemonCards.messageLimitComparing,
				});

				return;
			}
			return setWillCompare([...willCompare, props]);
		}

		const reducedWillCompare = willCompare.map(
			(data: TWillCompare, index: number) => data?.name != props?.name && data
		) as TWillCompare[];

		setWillCompare(reducedWillCompare);
	};

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			["pokemons"],
			({ pageParam = 0 }) => {
				return fetchPokemonsApi({
					limit: 10,
					offset: 10 * pageParam,
					filter: {
						generationIds: [],
						typeIds: [],
					},
				});
			},
			{
				getNextPageParam: (lastPage, allPages) => {
					const nextPage =
						lastPage.length === LIMIT ? allPages.length + 1 : undefined;
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
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 lg:w-10/12 xl:w-8/12 m-auto mt-8 pb-16">
				{data?.pages.map((page) =>
					page.map((poke: any, i: number) => {
						return (
							<PokemonCards
								isSelecting={isSelecting}
								willCompare={willCompare}
								setCompare={setCompare}
								dictionary={dictionary}
								ref={page.length === i + 1 ? ref : undefined}
								key={i}
								pokemonData={poke}
							/>
						);
					})
				)}

				<FilterDrawer isOpen={openFilter} setOpen={setOpenFilter} />

				<FloatButton.Group
					open={open}
					onClick={() => setOpen(!open)}
					trigger="click"
					style={{ right: 24, bottom: 100 }}
					icon={<MenuOutlined />}
				>
					<FloatButton
						onClick={() => setOpenFilter(!openFilter)}
						icon={<FilterOutlined />}
					/>
					<FloatButton
						onClick={() => setSelecting(!isSelecting)}
						icon={<RadarChartOutlined />}
					/>
				</FloatButton.Group>
			</div>
			{isFetchingNextPage && (
				<div className="h-44 w-11/12 lg:w-10/12 xl:w-8/12 m-auto flex items-center justify-center">
					<div className="text-center">
						<LoadingOutlined className="text-8xl text-white" />
					</div>
				</div>
			)}
			{isSelecting && (
				<div className="absolute sticky bottom-8 bg-white h-14 w-full md:w-6/12 m-auto rounded-xl flex flex-row p-1 justify-between">
					<div className="flex flex-row">
						{willCompare.map((dataCompare: TWillCompare, i: number) => {
							if (!dataCompare) return null;
							return (
								<div key={i} className="flex flex-1">
									<img
										className="object-cover object-center w-full"
										src={dataCompare.imageUrl}
										alt={dataCompare?.name}
									/>
								</div>
							);
						})}
					</div>
					<Link
						className="my-auto"
						href={`/comparison?pokemon=${getListPokemon()}`}
					>
						<button className="px-4 py-1 rounded-xl bg-blue-800 text-white text-xs">
							<p>{dictionary.pokemonCards.comparing}</p>
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}

export default PokeListPanel;
