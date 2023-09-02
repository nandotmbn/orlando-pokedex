"use client";

import React, { useEffect } from "react";

function ModeSwitcher() {
	const getStatus = () => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (document.documentElement.classList.contains("dark")) {
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

	useEffect(() => {
		getStatus();
	}, []);

	return (
		<div>
			<button
				className="p-1 rounded bg-yellow-400 dark:bg-gray-900"
				onClick={handleSwitch}
			>
				<span className="material-symbols-outlined text-white p-1 pb-0 dark:text-blue-400">
					light_mode
				</span>
			</button>
		</div>
	);
}

export default ModeSwitcher;
