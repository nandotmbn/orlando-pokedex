import { serviceInstance } from "..";

interface IGetByName {
	isNotify: boolean;
	name: string,
}

async function getSpeciesByNamePokemons({
	isNotify,
	name
}: IGetByName) {
	const { data } = await serviceInstance(isNotify).get(
		`/pokemon-species/${name}`,
	);
	return data;
}
export { getSpeciesByNamePokemons };
