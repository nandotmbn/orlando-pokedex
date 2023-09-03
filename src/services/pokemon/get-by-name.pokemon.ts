import { serviceInstance } from "..";

interface IGetByName {
	isNotify: boolean;
	name: string,
}

async function getByNamePokemons({
	isNotify,
	name
}: IGetByName) {
	const { data } = await serviceInstance(isNotify).get(
		`/pokemon/${name}`,
	);
	return data;
}
export { getByNamePokemons };
