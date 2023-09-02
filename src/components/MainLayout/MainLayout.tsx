import { CheckOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons/lib/icons";
import { ConfigProvider } from "antd";
import Switch from "antd/es/switch";
import Link from "next/link";
import React from "react";
import LanguageSwitcher from "./partials/LanguageSwitcher";
import ModeSwitcher from "./partials/ModeSwitcher";

function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className="border-b-2 border-gray-300 dark:bg-black">
				<div className="flex flex-row h-20 items-center justify-between m-auto w-8/12">
					<h1 className="text-gray-800 font-light text-2xl dark:invert">Orlando Pokedex</h1>
					<div className="flex flex-row gap-8 items-center">
						<ul className="flex flex-row gap-4 dark:invert">
							<li>
								<Link href="/">
									<p>Favourites</p>
								</Link>
							</li>
							<li>
								<Link href="/">
									<p>Why this project exists?</p>
								</Link>
							</li>
						</ul>

						<LanguageSwitcher />
						<ModeSwitcher />
					</div>
				</div>
			</header>
			<main>{children}</main>
		</>
	);
}

export default MainLayout;
