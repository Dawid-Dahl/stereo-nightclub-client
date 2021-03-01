import React from "react";
import styled from "styled-components";

type Props = {
	username: string;
};

const AuthorizedAdminPage: React.FC<Props> = ({username}) => {
	return (
		<Wrapper>
			<h1>{`Hello, ${username}!`}</h1>
		</Wrapper>
	);
};

export default AuthorizedAdminPage;

const Wrapper = styled.div``;
