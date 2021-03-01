import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import AddProduct from "./AddProduct";

type Props = {
	username: string;
};

const AuthorizedAdminPage: React.FC<Props> = ({username}) => {
	return (
		<Wrapper>
			<h1>{`Hello, ${username}!`}</h1>
			<Link to={"addProduct"}>
				<Option>Add a product</Option>
			</Link>
		</Wrapper>
	);
};

export default AuthorizedAdminPage;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	> h1 {
		margin: 2em;
		text-align: center;
	}

	> a {
		color: white;
		text-decoration: none;
		width: 80%;
	}
`;

const Option = styled.div`
	background-color: var(--main-color-light);
	height: 5em;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	box-shadow: var(--box-shadow-light);
	cursor: pointer;
	background-color: var(--main-color-blue-dark);
	transition: all 0.2s;
	font-weight: lighter;
	color: white;
	text-decoration: none;

	:hover {
		transform: scale(1.05);
		background-color: var(--main-color-blue);
	}
`;
