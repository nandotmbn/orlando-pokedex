import MainLayout from "@/components/MainLayout/MainLayout";
import { getDictionary } from "@/app/[lang]/get-dictionaries";
import { Metadata, ResolvingMetadata } from "next";
import ComparisonViews from "@/views/comparison/ComparisonViews";

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

export default async function Home(props: any) {
	const { params } = props;
	const dictionary = await getDictionary(params?.lang);

	return (
		<MainLayout dictionary={dictionary}>
			<ComparisonViews dictionary={dictionary} searchParams={props?.searchParams} />
		</MainLayout>
	);
}
