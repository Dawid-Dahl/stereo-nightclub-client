import React, {useState, useEffect} from "react";
import Header from "./Header";
import ProductGrid from "./ProductGrid";
import Paginator from "./Paginator";
import GetInTouch from "./GetInTouch";
import Footer from "./Footer";
import styled from "styled-components";
import {TProduct} from "../types";
import Product from "./Product";
require("dotenv").config();

const ProductsPage = () => {
	const [products, setProducts] = useState<TProduct[]>([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${process.env.DJANGO_API_URL}/api/products/`)
			.then(res => res.json())
			.then(data => {
				setProducts(data.reverse());
				setIsLoading(false);
			});
	}, []);

	const productsPerPage = 9;
	const pagesVisited = pageNumber * productsPerPage;
	const pageCount = Math.ceil(products.length / productsPerPage);

	const displayProducts = (products: TProduct[]) =>
		products
			.slice(pagesVisited, pagesVisited + productsPerPage)
			.map(({id, title, image, description, price}) => (
				<Product
					key={id}
					title={title}
					image={image}
					description={description}
					price={price}
				/>
			));

	return (
		<Wrapper>
			<ContentWrapper>
				<Header />
				<ProductGrid
					displayProducts={displayProducts}
					products={products}
					isLoading={isLoading}
				/>
			</ContentWrapper>
			<FooterWrapper>
				<Paginator pageCount={pageCount} setPageNumber={setPageNumber} />
				<GetInTouch />
				<Footer />
			</FooterWrapper>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--main-color);
	min-height: 100vh;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const ContentWrapper = styled.div`
	flex: 1 0 auto;
`;
const FooterWrapper = styled.div``;

export default ProductsPage;
