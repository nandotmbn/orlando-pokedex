import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

interface IPropsGenerateMetadata {
	params: { id: string };
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

export default function Home({lang}: {lang: "id" | "en"}) {
	return (
		<main className="bg-white h-screen dark:bg-black">
			<div className="h-44 flex items-center">
				
			</div>
		</main>
	);
}
