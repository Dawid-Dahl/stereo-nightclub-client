import React from "react";
import styled from "styled-components";
import Link from "@material-ui/core/Link";

const ShieldPage = () => {
	return (
		<InnerWrapper>
			<h1>You must be an admin to view this page.</h1>
			<Link href="/login" variant="body2">
				{"Log in now"}
			</Link>
			<Link href="/register" variant="body2">
				{"Or register"}
			</Link>
		</InnerWrapper>
	);
};

export default ShieldPage;

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
`;
