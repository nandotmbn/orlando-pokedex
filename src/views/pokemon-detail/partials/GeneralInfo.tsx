/* eslint-disable @next/next/no-img-element */
import React from "react";

interface IGeneralInfo {
	pokemonImg: any;
	name: string;
	pokemonData: any;
}

function GeneralInfo({ pokemonImg, name, pokemonData }: IGeneralInfo) {
	return (
		<div className="flex items-center justify-center flex-col">
			<div className="w-72 m-auto">
				<img
					className="object-cover object-center w-full"
					src={pokemonImg}
					alt={name}
				/>
			</div>
			<h5 className="text-gray-700 dark:text-white font-bold text-lg">
				#{pokemonData?.data?.id}
			</h5>
			<h5 className="text-gray-700 dark:text-white font-bold text-2xl capitalize">
				{pokemonData?.data?.name}
			</h5>
		</div>
	);
}

export default GeneralInfo;
