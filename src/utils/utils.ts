export const JWTFetch = (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
	if (localStorage["x-token"]) {
		if (!init) {
			init = {headers: {}};
		}
		// @ts-ignore
		init.headers["Authorization"] = `Bearer ${localStorage["x-token"]}`;
	}

	return fetch(input, init);
};

export const isUserLoggedIn = (): boolean =>
	localStorage.getItem("x-token") && localStorage.getItem("refresh-token") ? true : false;

export const getAndSetTokens = (
	email: string,
	password: string
): Promise<{access: string; refresh: string} | null> => {
	return new Promise((res, rej) => {
		fetch(`${process.env.DJANGO_API_URL}/api/token/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.freeze({email, password})),
		})
			.then(res => res.json())
			.then(data => {
				if (data.access && data.refresh) {
					localStorage.setItem("x-token", data.access);
					localStorage.setItem("refresh-token", data.refresh);
					res(data);
				} else {
					rej(null);
				}
			})
			.catch(e => {
				console.error(e);
				rej(null);
			});
	});
};
