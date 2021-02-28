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
				if (data.length > 1) {
					setProducts(data.reverse());
				} else {
					setProducts([data]);
				}
				setIsLoading(false);
			});
	}, []);

	const productsPerPage = 9;
	const pagesVisited = pageNumber * productsPerPage;
	const pageCount = Math.ceil(products.length / productsPerPage);

	const displayProducts = (products: TProduct[]) =>
		products
			.slice(pagesVisited, pagesVisited + productsPerPage)
			.map(({id, title, image, description, price, ingredient}) => (
				<Product
					key={id}
					id={id}
					title={title}
					image={image}
					description={description}
					price={price}
					ingredient={ingredient}
				/>
			));

	return (
		<Wrapper>
			<Header isLinkVisible linktitle="Admin" link="login" openInNewTab={false} />
			<ContentWrapper>
				<h1>WELCOME TO STEREO CLUB</h1>
				<h3>
					<span>WE CREATE</span> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Cumque vitae vel id commodi sed inventore debitis. Ipsum consectetur rerum
					placeat, ratione fugiat, reprehenderit error harum officia nisi esse recusandae
					tempora quis animi omnis amet, suscipit itaque cum! Debitis similique odio
					dolor? Ipsum consectetur rerum placeat.
				</h3>
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
	flex-direction: column;

	> h1 {
		font-size: var(--font-size-header);
		text-align: center;
		margin: 1.1em 0 0.5em 0;
	}

	h3 {
		text-align: center;
		font-size: var(--font-size-small);
		line-height: 1.7em;
		font-weight: 400;
		max-width: 350px;
		margin: 0 auto;

		span {
			font-weight: bold;
		}
	}

	@media only screen and (max-width: 480px) {
		h3 {
			padding: 2em;
		}
	}
`;
const FooterWrapper = styled.div``;

export default ProductsPage;
