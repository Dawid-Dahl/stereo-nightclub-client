export const JWTFetch = (input: RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
	if (localStorage["x-token"]) {
		if (!init) init = {headers: {}};

		if (isXTokenExpired()) {
			if (isRefreshTokenExpired()) {
				alert("You're refresh token has expired, please log back in again");
				window.location.href = "/login/";
			}

			const refreshToken = localStorage.getItem("refresh-token");

			if (refreshToken) {
				refreshAndSetXToken(refreshToken);
			} else {
				throw new Error("There was a problem accessing the local storage.");
			}
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

export const refreshAndSetXToken = (refreshToken: string): Promise<{access: string} | null> => {
	if (isRefreshTokenExpired()) return Promise.reject(null);

	return new Promise((res, rej) => {
		fetch(`${process.env.DJANGO_API_URL}/api/token/refresh/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.freeze({refresh: refreshToken})),
		})
			.then(res => res.json())
			.then(data => {
				if (data.access) {
					localStorage.setItem("x-token", data.access);
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

export const isXTokenExpired = () => {
	const token = localStorage.getItem("x-token");

	const now = Math.ceil(Date.now() / 1000);

	if (token) {
		const parsedToken = JSON.parse(atob(token.split(".")[1]));
		return parsedToken.exp > now ? false : true;
	}

	return true;
};

export const isRefreshTokenExpired = () => {
	const token = localStorage.getItem("refresh-token");

	const now = Math.ceil(Date.now() / 1000);

	if (token) {
		const parsedToken = JSON.parse(atob(token.split(".")[1]));
		return parsedToken.exp > now ? false : true;
	}

	return true;
};

export const logout = () => {
	const refreshToken = localStorage.getItem("refresh-token");

	if (refreshToken) {
		fetch(`${process.env.DJANGO_API_URL}/api/users/logout/blacklist/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({refresh_token: refreshToken}),
		})
			.then(res => res.json())
			.then(data => {
				console.log("Logged out and Refresh Token blacklisted.");
				localStorage.clear();
			})
			.catch(e => {
				console.error(e);
				localStorage.clear();
			});
	} else {
		console.error("No tokens in local storage.");
	}
};
