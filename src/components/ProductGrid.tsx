import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

export const ProductGrid = ({displayProducts, products}) => {
	return (
		<Wrapper>
			<Grid>{displayProducts(products)}</Grid>
		</Wrapper>
	);
};

ProductGrid.propTypes = {
	displayProducts: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
};

const Wrapper = styled.div`
	margin: 0 auto;
	max-width: 55em;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.5em;
	align-items: center;
	justify-content: center;
	margin: 1em 2em;

	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media only screen and (max-width: 480px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export default ProductGrid;
