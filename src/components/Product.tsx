import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {TProduct} from "../types";

type Props = TProduct;

const Product: React.FC<Props> = ({id, title, image, description, price, ingredient}) => {
	return (
		<Wrapper>
			<Link to={`product?id=${id}`}>
				<Overlay>
					<h2>{price} $</h2>
					<p>{ingredient}</p>
				</Overlay>
				<Image src={image} />
			</Link>
			<h1>{title.toUpperCase()}</h1>
			<p>{description}</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: var(--bpx-shadow);

	a {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		text-decoration: none;
		color: inherit;
	}

	h1 {
		margin: 0.8em 0 0.2em 0;
		font-size: var(--font-size-main);
		text-align: center;
		cursor: pointer;
	}

	p {
		margin: 0 0 1em 0;
		text-align: center;
		color: var(--text-color-dark);
		font-size: var(--font-size-small);
	}
`;

const Overlay = styled.div`
	position: absolute;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	flex-direction: column;
	width: 80%;
	height: 70%;
	transition: opacity 0.2s;
	opacity: 0;
	cursor: pointer;

	:hover {
		opacity: 1;
	}

	h2 {
		font-size: 1em;
		margin: 1em 0 0.4em 0;
	}

	p {
		color: white;
	}
`;

const Image = styled.img`
	min-height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: center;
	cursor: pointer;

	@media only screen and (max-width: 480px) {
		height: 19em;
		max-width: 19em;
	}
`;

export default Product;
