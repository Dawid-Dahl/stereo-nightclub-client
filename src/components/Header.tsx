import React from "react";
import styled from "styled-components";

type Props = {
	isLinkVisible: boolean;
	linktitle?: string;
	link?: string;
	openInNewTab: boolean;
};

const Header: React.FC<Props> = ({isLinkVisible, linktitle, link, openInNewTab}) => {
	return (
		<Wrapper>
			<GreyBanner>
				{isLinkVisible && openInNewTab ? (
					<a href={link} target="_blank">
						{linktitle?.toLowerCase()}
					</a>
				) : (
					<a href={link}>{linktitle?.toLowerCase()}</a>
				)}
			</GreyBanner>
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
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 61px;
	width: 100%;
	background-color: var(--main-color-light);
	border-bottom: 1.5px solid var(--main-color-border);

	a {
		margin-right: 3em;
		text-decoration: none;
		color: var(--main-color-medium);
		font-size: var(--font-size-header);
	}
`;

const Logo = styled.img`
	width: 7em;
	margin-top: 0.5em;
	z-index: 1;
`;

export default Header;
