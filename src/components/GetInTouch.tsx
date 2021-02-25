import React from "react";
import MapLocator from "./MapLocator";
import styled from "styled-components";

const GetInTouch = () => {
	return (
		<Wrapper>
			<h1>GET IN TOUCH</h1>
			<p>47 CHandos Place, London, WX2N 4HS</p>
			<MapLocator />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 17em;
	background-image: url("https://i.imgur.com/41Sus9J.jpg");
	background-size: cover;
	background-position: top;
	background-repeat: no-repeat;

	h1 {
		margin: 0;
		font-size: 1.1em;
	}

	p {
		font-size: var(--font-size-small);
	}
`;

export default GetInTouch;
