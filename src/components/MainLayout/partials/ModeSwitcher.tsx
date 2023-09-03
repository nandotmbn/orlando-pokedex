"use client";

import React, { useEffect, useLayoutEffect } from "react";
import {Tooltip} from "antd"

function ModeSwitcher() {
	const getStatus = () => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (localStorage.getItem("theme") == "dark") {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	const handleSwitch = () => {
		if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.add("light");
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			document.documentElement.classList.remove("light");
			localStorage.setItem("theme", "dark");
		}
	};

	useLayoutEffect(() => {
		getStatus();
	}, []);

	return (
		<div>
			<Tooltip title="Click to switch your theme!">
				<button
					className="p-1 rounded bg-yellow-400 dark:bg-gray-900"
					onClick={handleSwitch}
				>
					<span className="material-symbols-outlined text-white p-1 pb-0 dark:text-blue-400">
						light_mode
					</span>
				</button>
			</Tooltip>
		</div>
	);
}

export default ModeSwitcher;
