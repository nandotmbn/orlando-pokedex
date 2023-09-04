import { LoadingOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";

interface IEvolutionSelector {
	dictionary: any;
	handleChange: (props: any) => void;
	name: string;
	pokemonDataGql: any;
	isFetchingNew: boolean;
}

function EvolutionSelector({
	dictionary,
	handleChange,
	name,
	pokemonDataGql,
	isFetchingNew = false,
}: IEvolutionSelector) {
	return (
		<div className="flex flex-row justify-end gap-4 items-center">
			{isFetchingNew && (
				<div className="text-gray-700 dark:text-white">
					<LoadingOutlined />
				</div>
			)}
			<h3 className="text-gray-700 dark:text-white">
				{dictionary?.detailPage?.forms}
			</h3>
			<Select
				defaultValue={name.toUpperCase()}
				style={{ width: 180 }}
				onChange={handleChange}
				options={pokemonDataGql?.data?.pokemons?.map(
					(spec: any) => {
						return { value: spec?.name, label: <p className="text-xs">{spec?.name?.toUpperCase()}</p> };
					}
				)}
			/>
		</div>
	);
}

export default EvolutionSelector;
