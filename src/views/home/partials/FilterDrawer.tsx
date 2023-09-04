import pokemonColorTypeConverter from "@/constants/type-color.pokemon.constants";
import { getAllGenerationsApi, getAllTypesApi } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Drawer } from "antd";
import hexToRgba from "hex-to-rgba";
import React, { useState } from "react";

interface IFilterDrawer {
	isOpen: boolean;
	setOpen: (boolean: boolean) => void;
	dictionary: any;
}

function FilterDrawer({ isOpen, setOpen, dictionary }: IFilterDrawer) {
	const [selectedTypes, setSelectedTypes] = useState<string[]>()
	const [selectedGenes, setSelectedGenes] = useState<string[]>()

	const onClose = () => {
		setOpen(false);
	};

	const types = useQuery(["types"], () => {
		return getAllTypesApi();
	});

	const genes = useQuery(["genes"], () => {
		return getAllGenerationsApi();
	});

	return (
		<Drawer
			placement="bottom"
			width={500}
			onClose={onClose}
			open={isOpen}
			extra={
				<div className="flex flex-row-reverse gap-2">
					<button className="px-2 text-xs py-1 bg-blue-500 text-white rounded">
						{dictionary?.filter?.filter}
					</button>
					<button className="px-2 text-xs py-1 bg-red-500 text-white rounded">
						{dictionary?.filter?.cancel}
					</button>
					<button className="px-2 text-xs py-1 bg-yellow-700 text-white rounded">
						{dictionary?.filter?.reset}
					</button>
				</div>
			}
		>
			<div className="flex flex-row gap-4 justify-between">
				<div className="flex flex-1 flex-col">
					<h2>{dictionary.filter.types}</h2>
					<div className="grid grid-cols-1 gap-1">
						{types?.data?.map((type: any, i: number) => {
							const color = pokemonColorTypeConverter(type?.name) || "FFFFFF";
							return (
								<button
									key={i}
									style={{
										backgroundColor: hexToRgba(color, 1),
									}}
									className="flex flex-row items-center justify-start rounded-full px-1 gap-1"
								>
									<div className="h-4 w-4 rounded-full bg-white border-2 flex items-center justify-center">
										{/* <div className="h-2 w-2 rounded-full bg-blue-700"></div> */}
									</div>
									<p className="capitalize text-white">{type?.name}</p>
								</button>
							);
						})}
					</div>
				</div>
				<div className="flex flex-1 flex-col">
					<h2>{dictionary.filter.generation}</h2>
					<div className="grid grid-cols-1">
						{genes?.data?.map((gen: any, i: number) => {
							return (
								<button
									key={i}
									className="flex flex-row items-center justify-start"
								>
									<div className="h-4 w-4 rounded-full bg-white border-2 flex items-center justify-center">
										{/* <div className="h-2 w-2 rounded-full bg-blue-700"></div> */}
									</div>
									<p>{gen?.name}</p>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</Drawer>
	);
}

export default FilterDrawer;
