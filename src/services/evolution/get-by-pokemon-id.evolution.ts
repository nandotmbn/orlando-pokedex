import { serviceInstance } from "..";

interface IGetByName {
	isNotify: boolean;
	id: number,
}

async function getEvoByPokemonId({
	isNotify,
	id
}: IGetByName) {
	const { data } = await serviceInstance(isNotify).get(
		`/evolution-chain/${id}`,
	);
	return data;
}
export { getEvoByPokemonId };
