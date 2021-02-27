import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {TProduct} from "../types";
import {loadingSpinner} from "../content/icons/icons";

type Props = {
	displayProducts: (products: TProduct[]) => JSX.Element[];
	products: TProduct[];
	isLoading: boolean;
};

export const ProductGrid: React.FC<Props> = ({displayProducts, products, isLoading}) => {
	return isLoading ? (
		<LoadingSpinner>
			<img src={loadingSpinner.imageLink} alt="loading spinner" />
		</LoadingSpinner>
	) : (
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

const LoadingSpinner = styled.div`
	width: 100%;
	height: 100%;
	margin: 2em 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default ProductGrid;
