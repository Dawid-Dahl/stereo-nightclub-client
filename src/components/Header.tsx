import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import styled from "styled-components";
import {isRefreshTokenExpired, isUserLoggedIn, isXTokenExpired, logout} from "../utils/utils";

type Props = {
	isLinkVisible: boolean;
	linktitle?: string;
	link?: string;
	openInNewTab: boolean;
};

const Header: React.FC<Props> = ({isLinkVisible, linktitle, link, openInNewTab}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (isUserLoggedIn()) setIsLoggedIn(true);
	}, []);

	return (
		<Wrapper>
			<GreyBanner>
				{isLinkVisible && openInNewTab ? (
					<a href={link} target="_blank">
						{linktitle?.toLowerCase()}
					</a>
				) : (
					<>
						<a href={link}>{linktitle?.toLowerCase()}</a>
						{isLoggedIn && (
							<a href={"/"} onClick={logout}>
								logout
							</a>
						)}
					</>
				)}
			</GreyBanner>
			<Logo src="https://i.imgur.com/REHNLOH.png" onClick={() => history.push("/")} />
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
		transition: color 0.2s;
		font-weight: 100;
	}

	a:hover {
		color: var(--text-color-dark);
	}

	@media only screen and (max-width: 480px) {
		justify-content: space-between;

		a {
			margin: 0 1em;
		}
	}
`;

const Logo = styled.img`
	width: 7em;
	margin-top: 0.5em;
	z-index: 1;
	cursor: pointer;
`;

export default Header;
