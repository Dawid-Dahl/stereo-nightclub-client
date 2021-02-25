import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Product = ({title, image, description, price, ingredients}) => {
	return (
		<Wrapper>
			<Overlay>
				<h2>{price} $</h2>
				<p>Blah blah blah</p>
			</Overlay>
			<Image src={image} />
			<h1 className="product-h1">{title.toUpperCase()}</h1>
			<p>{description}</p>
		</Wrapper>
	);
};

Product.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.string,
	description: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	ingredients: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80%;

	h1 {
		margin: 0.8em 0 0.2em 0;
		font-size: 0.65em;
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
	height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: center;
	cursor: pointer;
`;

export default Product;
