"use client";

import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import ModeSwitcher from "./ModeSwitcher";

function DrawerMenu({ dictionary }: { dictionary: any }) {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<div className="md:hidden bg-black">
			<button className="text-white p-2" onClick={showDrawer}>
				<MenuOutlined />
			</button>
			<Drawer
				title={<h5 className="text-gray-600 dark:text-white">Menu</h5>}
				placement="right"
				onClose={onClose}
				open={open}
        className="dark:bg-gray-900"
			>
				<div className="flex flex-col gap-8 items-end">
					<ul className="flex flex-col gap-4 dark:invert">
						<li>
							<Link href="/favourites">
								<p className="text-sm text-right text-gray-600 hover:text-black hover:dark:text-white dark:invert">
									{dictionary?.headerMenu?.favourite}
								</p>
							</Link>
						</li>
						<li>
							<Link href="/background">
								<p className="text-sm text-right text-gray-600 hover:text-black hover:dark:text-white dark:invert">
									{dictionary?.headerMenu?.background}
								</p>
							</Link>
						</li>
					</ul>

					<div className="flex flex-row gap-8 items-center">
						<LanguageSwitcher />
						<ModeSwitcher />
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default DrawerMenu;
