import { serviceInstance } from "..";

interface IGetPokemons {
	limit: number;
	offset: number;
	isNotify: boolean;
}

async function getPokemons({
	limit,
	offset,
	isNotify,
}: IGetPokemons) {
	const { data } = await serviceInstance(isNotify).get(
		`/pokemon?limit=${limit}&offset=${offset}`,
	);
	return data;
}
export { getPokemons };
