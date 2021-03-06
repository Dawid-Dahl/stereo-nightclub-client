import React, {useEffect, useState} from "react";
import Header from "./Header";
import styled from "styled-components";
import {loadingSpinner} from "../content/icons/icons";
import {isRefreshTokenExpired, isXTokenExpired, logout, refreshAndSetXToken} from "../utils/utils";
import {useHistory} from "react-router-dom";
import AuthorizedAdminPage from "./AuthorizedAdminPage";
import ShieldPage from "./ShieldPage";

const Admin = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [username, setUserName] = useState("");
	const history = useHistory();

	useEffect(() => {
		setIsLoading(true);

		try {
			if (isXTokenExpired()) {
				const refreshToken = localStorage.getItem("refresh-token");

				if (refreshToken) {
					if (isRefreshTokenExpired()) {
						alert("Your refresh token has expired, please login.");
						logout();
						history.push("/login");
					} else {
						refreshAndSetXToken(refreshToken)
							.then(res => {
								setIsLoading(false);
								setIsUserLoggedIn(true);
							})
							.catch(e => {
								console.error(e);
							});
					}
				} else {
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
				setIsUserLoggedIn(true);
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("refresh-token");

		if (token) {
			const parsedToken = JSON.parse(atob(token.split(".")[1]));

			setUserName(parsedToken.name);
		}
	}, []);

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="home" link="/" openInNewTab={false} />
			{isLoading ? (
				<LoadingSpinner>
					<img src={loadingSpinner.imageLink} alt="loading spinner" />
				</LoadingSpinner>
			) : isUserLoggedIn ? (
				<InnerWrapper>
					<AuthorizedAdminPage username={username} isUserLoggedIn={isUserLoggedIn} />
				</InnerWrapper>
			) : (
				<ShieldPage />
			)}
		</OuterWrapper>
	);
};

export default Admin;

const OuterWrapper = styled.div`
	background-color: var(--main-color);
	height: 100vh;
`;

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	height: 80%;

	> h1 {
		margin-top: 3em;
		text-align: center;
	}

	> a {
		font-size: var(--font-size-header);
		transition: color 0.2s;
		color: var(--main-color-blue-dark);

		:hover {
			text-decoration: none;
			color: var(--main-color-blue);
		}
	}

	@media only screen and (max-height: 480px) {
		h1 {
			margin: 1em;
		}

		height: auto;
	}
`;

const LoadingSpinner = styled.div`
	margin: 38vh 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
