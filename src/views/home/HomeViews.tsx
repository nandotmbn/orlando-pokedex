"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import PokeListPanel from "./partials/PokeListPanel";

interface IHomeViews {
	dictionary: any;
	searchParams: any
}

function HomeViews({ dictionary, searchParams }: IHomeViews) {

	return (
		<main className="bg-white dark:bg-gray-900">
			<div className="flex flex-row items-center justify-center w-10/12 m-auto py-8 gap-2 border-b-2 border-black dark:border-white">
				<div className="flex flex-1 flex-col text-center items-center md:text-left md:items-start">
					<h2
						style={{ fontFamily: "Rubik Iso" }}
						className="text-black dark:invert text-6xl"
					>
						{dictionary.home.welcome}
					</h2>
					<h2
						style={{ fontFamily: "Rubik Iso" }}
						className="text-black dark:invert text-6xl"
					>
						{dictionary.home.to}
					</h2>
					<h2
						style={{ fontFamily: "Bruno Ace" }}
						className="text-black dark:invert text-4xl"
					>
						Orlando Pokedex
					</h2>
					<a href="#poke-list" className="w-44 mt-8">
						<p className="text-black dark:invert rounded-full border-black border-2 text-center text-2xl">
							{dictionary.home.next}
						</p>
					</a>
				</div>
				<div className="flex flex-1 animate-pulse  hidden md:flex">
					<Image
						className="contain relative w-full"
						src="/cdn/images/pikachu.png"
						alt="OKE"
						width={720}
						height={720}
						unoptimized={true}
					/>
				</div>
			</div>

			<div id="poke-list" className="">
				<PokeListPanel searchParams={searchParams} dictionary={dictionary} />
			</div>
		</main>
	);
}

export default HomeViews;
