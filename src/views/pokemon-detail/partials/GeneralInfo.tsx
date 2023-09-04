/* eslint-disable @next/next/no-img-element */
import TypeTag from "@/components/TypeTag/TypeTag";
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
					height={400}
					width={400}
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
			<div
				className={`${
					pokemonData?.data?.types?.length > 1 ? "grid-cols-2" : "grid-cols-1"
				} grid gap-2 w-1/3 m-auto`}
			>
				{pokemonData?.data?.types?.map((type: any, i: number) => {
					return <TypeTag name={type?.type?.name} key={i} />;
				})}
			</div>
		</div>
	);
}

export default GeneralInfo;
