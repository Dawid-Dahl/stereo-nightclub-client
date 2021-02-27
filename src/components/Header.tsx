import React from "react";
import styled from "styled-components";

const Header = () => {
	return (
		<Wrapper>
			<GreyBanner />
			<Logo src="https://i.imgur.com/REHNLOH.png" />
		</Wrapper>
	);
};

const Wrapper = styled.header`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const GreyBanner = styled.div`
	position: absolute;
	height: 61px;
	width: 100%;
	background-color: var(--main-color-light);
	border-bottom: 1.5px solid var(--main-color-border);
`;

const Logo = styled.img`
	width: 7em;
	margin-top: 0.5em;
	z-index: 1;
`;

export default Header;
