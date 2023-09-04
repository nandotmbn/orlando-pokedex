import MainLayout from "@/components/MainLayout/MainLayout";
import { getDictionary } from "../get-dictionaries";
import { Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/navigation";
import FavouriteViews from "@/views/favourites/FavouriteViews";

interface IPropsGenerateMetadata {
	params: { id: string; lang: "en" | "id" };
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
	props: IPropsGenerateMetadata,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: "Favourite - Orlando Pokedex",
		description: "This is Orlando Pokedex",
		authors: [
			{
				name: "Orlando Pratama Tambunan",
				url: "https://orlando-portfolio.web.app/",
			},
		],
	};
}

export default async function Favourites({ params }: any) {
	const dictionary = await getDictionary(params?.lang);

	return (
		<MainLayout dictionary={dictionary}>
			<FavouriteViews dictionary={dictionary} />
		</MainLayout>
	);
}
