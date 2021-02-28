const JWTFetch = (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
	if (localStorage["x-token"]) {
		if (!init) {
			init = {headers: {}};
		}
		// @ts-ignore
		init.headers["Authorization"] = `Bearer ${localStorage["x-token"]}`;
	}

	return fetch(input, init);
};

export default JWTFetch;
