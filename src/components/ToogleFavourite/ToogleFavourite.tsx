/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";

interface IToogleFavourite { name: string, dictionary: any }

function ToogleFavourite({ name, dictionary }: IToogleFavourite) {
	const [isFav, setFav] = useState<boolean>(false);
	const handleToogleFavourite = () => {
		const fav: string[] = JSON.parse(localStorage?.favourites);

		if (isFav) {
			const reducedFav: string[] = [];
			fav.forEach((v: string) => {
				if (v != name) reducedFav.push(v);
			});

			localStorage.setItem("favourites", JSON.stringify(reducedFav));
      message.success({content: dictionary.toogle.remove})
      
      return getStateFav()
		}
    message.success({content: dictionary.toogle.success})
    
		localStorage.setItem("favourites", JSON.stringify([...fav, name]));
    return getStateFav()
	};

	const getStateFav = () => {
		const fav: any[] = JSON.parse(localStorage?.favourites);
		setFav(fav.includes(name));
	};

	useEffect(() => {
		if (!localStorage.favourites) {
			localStorage.setItem("favourites", JSON.stringify([]));
		}

		getStateFav();
	}, [localStorage]);

	return (
		<button
			onClick={handleToogleFavourite}
			className="rounded-full bg-white h-8 w-8 flex items-center justify-center text-red-500 active:animate-ping"
		>
			{isFav ? <HeartFilled /> : <HeartOutlined />}
		</button>
	);
}

export default ToogleFavourite;
