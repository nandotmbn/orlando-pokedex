"use client"

import Link from "next/link";
import React from "react";
import LanguageSwitcher from "./partials/LanguageSwitcher";
import ModeSwitcher from "./partials/ModeSwitcher";
import DrawerMenu from "./partials/DrawerMenu";
import { usePathname } from "next/navigation";

function MainLayout({
	children,
	dictionary,
}: {
	children: React.ReactNode;
	dictionary: any;
}) {
	const pathname = usePathname();
	const locale = pathname.split("/")[1];

	return (
		<>
			<header className="border-b-2 border-gray-300 dark:bg-gray-900">
				<div className="flex flex-row h-16 items-center justify-between w-11/12 m-auto">
					<Link href={"/" + locale} className="center">
						<h1
							style={{ fontFamily: "Bruno Ace" }}
							className="text-gray-800 font-light text-sm dark:text-white"
						>
							Orlando Pokedex
						</h1>
					</Link>
					<DrawerMenu dictionary={dictionary} />

					<div className="flex-row gap-8 items-center hidden md:flex">
						<ul className="flex flex-row gap-4 dark:invert">
							<li>
								<Link href={"/" + locale + "/favourites"}>
									<p className="text-sm text-gray-600 hover:text-black hover:dark:text-white dark:invert">
										{dictionary?.headerMenu?.favourite}
									</p>
								</Link>
							</li>
							<li>
								<Link href={"/" + locale + "/background"}>
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
