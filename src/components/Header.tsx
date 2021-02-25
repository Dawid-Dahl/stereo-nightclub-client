import React from "react";
import styled from "styled-components";

const Header = () => {
	return (
		<Wrapper>
			<GreyBanner />
			<Logo src="https://i.imgur.com/REHNLOH.png" />
			<h1>WELCOME TO STEREO CLUB</h1>
			<h3>
				<span>WE CREATE</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
				Cumque vitae vel id commodi sed inventore debitis. Ipsum consectetur rerum placeat,
				ratione fugiat, reprehenderit error harum officia nisi esse recusandae tempora quis
				animi omnis amet, suscipit itaque cum! Debitis similique odio dolor? Ipsum
				consectetur rerum placeat.
			</h3>
		</Wrapper>
	);
};

const Wrapper = styled.header`
	display: flex;
	align-items: center;
	flex-direction: column;

	h1 {
		font-size: 1em;
		text-align: center;
		margin: 0.9em 0 0.3em 0;
	}

	h3 {
		text-align: center;
		font-size: var(--font-size-small);
		line-height: 1.7em;
		font-weight: 400;
		max-width: 350px;

		span {
			font-weight: bold;
		}
	}
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
