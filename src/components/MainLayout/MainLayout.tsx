import Link from "next/link";
import React from "react";
import LanguageSwitcher from "./partials/LanguageSwitcher";
import ModeSwitcher from "./partials/ModeSwitcher";

function MainLayout({
	children,
	dictionary,
}: {
	children: React.ReactNode;
	dictionary: any;
}) {
	return (
		<>
			<header className="border-b-2 border-gray-300 dark:bg-gray-900">
				<div className="flex flex-row h-20 items-center justify-between m-auto w-8/12">
					<Link href="/">
						<h1
							style={{ fontFamily: "Bruno Ace" }}
							className="text-gray-800 font-light text-2xl dark:text-white"
						>
							Orlando Pokedex
						</h1>
					</Link>
					<div className="flex flex-row gap-8 items-center">
						<ul className="flex flex-row gap-4 dark:invert">
							<li>
								<Link href="/favourites">
									<p className="text-sm text-gray-600 hover:text-black hover:dark:text-white dark:invert">
										{dictionary?.headerMenu?.favourite}
									</p>
								</Link>
							</li>
							<li>
								<Link href="/background">
									<p className="text-sm text-gray-600 hover:text-black hover:dark:text-white dark:invert">
										{dictionary?.headerMenu?.background}
									</p>
								</Link>
							</li>
						</ul>

						<LanguageSwitcher />
						<ModeSwitcher />
					</div>
				</div>
			</header>
			<main className="">{children}</main>
		</>
	);
}

export default MainLayout;
