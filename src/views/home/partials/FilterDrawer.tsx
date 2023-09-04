"use client";

import pokemonColorTypeConverter from "@/constants/type-color.pokemon.constants";
import { getAllGenerationsApi, getAllTypesApi } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Drawer } from "antd";
import hexToRgba from "hex-to-rgba";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

interface IFilterDrawer {
	isOpen: boolean;
	setOpen: (boolean: boolean) => void;
	dictionary: any;
	searchParams: {
		generationIds: any;
		typeIds: any;
	};
}

function FilterDrawer({
	isOpen,
	setOpen,
	dictionary,
	searchParams,
}: IFilterDrawer) {
	const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
	const [selectedGenes, setSelectedGenes] = useState<number[]>([]);
	const pathname = usePathname();
	const locale = pathname.split("/")[1];

	const onClose = () => {
		setOpen(false);
	};

	const types = useQuery(["types"], () => {
		return getAllTypesApi();
	});

	const genes = useQuery(["genes"], () => {
		return getAllGenerationsApi();
	});

	const setSelectedParams = (
		operator: "ADD" | "DELETE",
		value: number,
		collection: number[],
		collectionSetter: Function
	) => {
		if (operator == "ADD") {
			return collectionSetter([...collection, value]);
		}

		const willCollect = collection.map(
			(data: number, index: number) => data != value && data
		) as number[];

		collectionSetter(willCollect);
	};

	const handleReset = () => {
		setSelectedTypes([]);
		setSelectedGenes([]);
	};

	const generateLink = () => {
		let willSelectedGenes: any[] = [];
		let willSelectedTypes: any[] = [];

		selectedGenes?.forEach((v) => {
			if (v) willSelectedGenes.push(v);
		});
		selectedTypes?.forEach((v) => {
			if (v) willSelectedTypes.push(v);
		});

		if (willSelectedGenes.length && willSelectedTypes.length) {
			return (
				"/" + locale + "?typeIds=" +
				`${willSelectedTypes}` +
				"&generationIds=" +
				`${willSelectedGenes}`
			);
		} else if (willSelectedTypes.length) {
			return "/" + locale + "?typeIds=" + `${willSelectedTypes}`;
		} else if (willSelectedGenes.length) {
			return "/" + locale + "?generationIds=" + `${willSelectedGenes}`;
		}

		return "/";
	};

	useEffect(() => {
		setSelectedGenes(searchParams?.generationIds?.split(",") || []);
		setSelectedTypes(searchParams?.typeIds?.split(",") || []);
	}, [searchParams, isOpen]);

	return (
		<Drawer
			placement="bottom"
			width={500}
			onClose={onClose}
			open={isOpen}
			extra={
				<div className="flex flex-row-reverse gap-2">
					<Link
						href={generateLink()}
						onClick={() => setOpen(false)}
						className="px-2 text-xs py-1 bg-blue-500 text-white rounded"
					>
						{dictionary?.filter?.filter}
					</Link>
					<button
						onClick={onClose}
						className="px-2 text-xs py-1 bg-red-500 text-white rounded"
					>
						{dictionary?.filter?.cancel}
					</button>
					<button
						onClick={handleReset}
						className="px-2 text-xs py-1 bg-yellow-700 text-white rounded"
					>
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
							const id = type.id;
							const color = pokemonColorTypeConverter(type?.name) || "FFFFFF";

							let choosen = false;

							selectedTypes?.forEach((selectedType: number) => {
								if (selectedType == id) choosen = true;
							});

							return (
								<button
									key={i}
									style={{
										backgroundColor: hexToRgba(color, 1),
									}}
									onClick={() => {
										setSelectedParams(
											choosen ? "DELETE" : "ADD",
											id,
											selectedTypes,
											setSelectedTypes
										);
									}}
									className="flex flex-row items-center justify-start rounded-full px-1 gap-1"
								>
									<div className="h-4 w-4 rounded-full bg-white border-2 flex items-center justify-center">
										{choosen && (
											<div className="h-2 w-2 rounded-full bg-blue-700"></div>
										)}
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
							const id = gen.id;
							let choosen = false;

							selectedGenes?.forEach((selectedGene: number) => {
								if (selectedGene == id) choosen = true;
							});

							return (
								<button
									key={i}
									className="flex flex-row items-center justify-start"
									onClick={() => {
										setSelectedParams(
											choosen ? "DELETE" : "ADD",
											id,
											selectedGenes,
											setSelectedGenes
										);
									}}
								>
									<div className="h-4 w-4 rounded-full bg-white border-2 flex items-center justify-center">
										{choosen && (
											<div className="h-2 w-2 rounded-full bg-blue-700"></div>
										)}
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
