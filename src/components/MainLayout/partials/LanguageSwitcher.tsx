/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Tooltip } from "antd";
import { useRouter } from "next/navigation";
import i18nConfig from "../../../../i18nConfig";
import { useCurrentLocale } from "next-i18n-router/client";

function LanguageSwitcher() {
	const router = useRouter();
	const locale = useCurrentLocale(i18nConfig);

	const handleSwitch = () => {
		if (locale == "id") {
			localStorage.setItem("lang", "en");
			router.replace("/en");
		} else {
			localStorage.setItem("lang", "id");
			router.replace("/");
		}
	};

	return (
		<div>
			<Tooltip
				title={
					locale == "en"
						? "Click to switch to Bahasa Indonesia!"
						: "Klik untuk mengganti ke Bahasa Inggris!"
				}
			>
				<button
					className="p-1 rounded bg-yellow-400 dark:bg-gray-900 w-16"
					onClick={handleSwitch}
				>
					{locale == "id" ? (
						<span className="text-white p-1 pb-0 dark:text-blue-400">ID</span>
					) : (
						<span className="text-white p-1 pb-0 dark:text-blue-400">EN</span>
					)}
				</button>
			</Tooltip>
		</div>
	);
}

export default LanguageSwitcher;
