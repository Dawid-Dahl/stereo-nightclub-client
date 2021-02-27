import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Header from "./Header";

const ProductPage = () => {
	return (
		<Wrapper>
			<Header />
			<ProductWrapper>
				<h1>PRODUCT</h1>
			</ProductWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--main-color);
`;

const ProductWrapper = styled.div`
	background-color: var(--main-color);
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default ProductPage;
