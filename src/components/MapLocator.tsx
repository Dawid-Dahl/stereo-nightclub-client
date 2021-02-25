import React from "react";
import styled from "styled-components";

const MapLocator = () => {
	return (
		<Wrapper href="https://goo.gl/maps/xHcKPAX3VuMhoxKNA" target="_blank">
			<p>Locate us on map</p>
		</Wrapper>
	);
};

const Wrapper = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--main-color-light);
	border-radius: 10px;
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	margin-top: 0.8em;

	:hover {
		background-color: var(--main-color);
	}

	p {
		font-weight: bold;
		margin: 3px 10px;
	}
`;

export default MapLocator;
