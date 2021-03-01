import React, {useEffect, useState} from "react";
import Header from "./Header";
import styled from "styled-components";
import {loadingSpinner} from "../content/icons/icons";
import {JWTFetch} from "../utils/utils";
import Link from "@material-ui/core/Link";

const Admin = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		JWTFetch(`${process.env.DJANGO_API_URL}/api/users/is-logged-in`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => {
				setIsLoading(false);
				setIsUserLoggedIn(data.isUserLoggedIn);
			})
			.catch(e => {
				setIsLoading(false);
			});
	}, []);

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="Back" link="/" openInNewTab={false} />
			{isLoading ? (
				<LoadingSpinner>
					<img src={loadingSpinner.imageLink} alt="loading spinner" />
				</LoadingSpinner>
			) : isUserLoggedIn ? (
				<InnerWrapper>
					<h1>SUPER SECRET</h1>
				</InnerWrapper>
			) : (
				<InnerWrapper>
					<h1>You must be an admin to view this page.</h1>
					<Link href="/login" variant="body2">
						{"Log in now"}
					</Link>
					<Link href="/register" variant="body2">
						{"Or register"}
					</Link>
				</InnerWrapper>
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
	justify-content: center;
	flex-direction: column;
	height: 80%;

	h1 {
		text-align: center;
		margin: 1em;
	}

	a {
		/* font-size: var(--font-size-header); */
		color: var(--main-color-blue);
	}
`;

const LoadingSpinner = styled.div`
	margin: 38vh 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;
