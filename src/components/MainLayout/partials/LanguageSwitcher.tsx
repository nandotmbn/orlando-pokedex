/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tooltip } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

function LanguageSwitcher() {
	const pathName = usePathname();
	const lang = pathName.split("/")[1] as any;

	const redirectedPathName = (locale: string) => {
		if (!pathName) return "/";
		const segments = pathName.split("/");
		segments[1] = locale;
		return segments.join("/");
	};

	return (
		<div>
			<Tooltip
				title={
					lang == "en"
						? "Click to switch to Bahasa Indonesia!"
						: "Klik untuk mengganti ke Bahasa Inggris!"
				}
			>
				<Link
					className="p-1 rounded bg-yellow-400 dark:bg-gray-900"
					href={redirectedPathName(lang == "id" ? "en" : "id")}
				>
						{lang == "id" ? (
							<span className="text-white p-1 pb-0 dark:text-blue-400">ID</span>
						) : (
							<span className="text-white p-1 pb-0 dark:text-blue-400">EN</span>
						)}
				</Link>
			</Tooltip>
		</div>
	);
}

export default LanguageSwitcher;
