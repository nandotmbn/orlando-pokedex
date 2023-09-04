import { ConfigProvider, Progress } from "antd";
import React from "react";

function StatTab({ stats }: { stats: any[] }) {
	return (
		<div className="">
			<ConfigProvider
				theme={{
					token: {
						colorText: "text-white",
					},
				}}
			>
				{stats?.map((stat: any, index: number) => {
					return (
						<div key={index} className="flex flex-col gap-1 items-start">
							<span className="flex flex-row gap-2 text-black dark:text-white">
								<p className="font-bold">({stat?.base_stat})</p>
								<p className="capitalize">{stat?.stat?.name?.split("-").join(" ")}</p>
							</span>
							<Progress
								className="text-black dark:text-white"
								percent={stat?.base_stat * 0.2}
								status="active"
								showInfo={false}
								strokeColor={{ from: "#108ee9", to: "#87d068" }}
							/>
						</div>
					);
				})}
			</ConfigProvider>
		</div>
	);
}

export default StatTab;
