import MainLayout from "@/components/MainLayout/MainLayout";
import { getDictionary } from "@/app/[lang]/get-dictionaries";
import { Metadata, ResolvingMetadata } from "next";
import PokemonDetailViews from "@/views/pokemon-detail/PokemonDetailViews";

interface IPropsGenerateMetadata {
	params: { id: string; lang: "en" | "id" };
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
	props: IPropsGenerateMetadata,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: "Pokemon Detail - Orlando Pokedex",
		description: "This is Orlando Pokedex for Pokemon Detail",
		authors: [
			{
				name: "Orlando Pratama Tambunan",
				url: "https://orlando-portfolio.web.app/",
			},
		],
	};
}

export default async function Home(props: any) {
	const { params } = props;
	const dictionary = await getDictionary(params?.lang);

	return (
		<MainLayout dictionary={dictionary}>
			<PokemonDetailViews dictionary={dictionary} />
		</MainLayout>
	);
}
