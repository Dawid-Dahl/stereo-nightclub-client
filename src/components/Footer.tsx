import React from "react";
import styled from "styled-components";

const Footer = () => {
	return (
		<>
			<FooterWrapper>
				<FooterInfo>Copyright © 2021</FooterInfo>
				<FooterInfo>47 CHandos Place, London, WX2N 4HS</FooterInfo>
				<FooterInfo>020 7836 0221</FooterInfo>
				<FooterInfo>info@soundoflondon.com</FooterInfo>
			</FooterWrapper>
		</>
	);
};

const FooterWrapper = styled.footer`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 4em;
`;

const FooterInfo = styled.p`
	font-size: var(--font-size-small);
	padding: 0 1em;
	border-right: 1px solid white;
	font-weight: bold;
	text-align: center;

	:nth-child(4) {
		border-right: unset;
	}
`;

export default Footer;
