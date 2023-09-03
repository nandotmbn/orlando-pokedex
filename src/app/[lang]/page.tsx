import MainLayout from "@/components/MainLayout/MainLayout";
import { getDictionary } from "@/app/[lang]/get-dictionaries";
import HomeViews from "@/views/home/HomeViews";
import { Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/navigation";

interface IPropsGenerateMetadata {
	params: { id: string; lang: "en" | "id" };
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
	props: IPropsGenerateMetadata,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: "Orlando Pokedex",
		description: "This is Orlando Pokedex",
		authors: [
			{
				name: "Orlando Pratama Tambunan",
				url: "https://orlando-portfolio.web.app/",
			},
		],
	};
}

export default async function Home({ params }: any) {
	const dictionary = await getDictionary(params?.lang);

	return (
		<MainLayout dictionary={dictionary}>
			<HomeViews dictionary={dictionary} />
		</MainLayout>
	);
}
