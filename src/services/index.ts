import { message } from "antd";
import axios from "axios";

const urlEndpoint = "https://pokeapi.co/api/v2/";

const serviceInstanceNoAuth = axios.create({
	baseURL: urlEndpoint,
	timeout: 10000,
});

const serviceInstance = (isNotify: boolean = false) => {
	const _serviceInstance = axios.create({
		baseURL: urlEndpoint,
		timeout: 10000,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	});

	_serviceInstance.interceptors.response.use(
		function (response): any {
			if (isNotify) message.success({ content: response.data.message });
			return response;
		},
		function (error) {
			if (isNotify) message.error({ content: error.response.data.message });
			return error;
		}
	);

	return _serviceInstance;
};

export { serviceInstanceNoAuth, serviceInstance };
