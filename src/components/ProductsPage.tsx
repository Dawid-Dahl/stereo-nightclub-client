import React, {useState, useEffect} from "react";
import Header from "./Header";
import ProductGrid from "./ProductGrid";
import Paginator from "./Paginator";
import GetInTouch from "./GetInTouch";
import Footer from "./Footer";
import styled from "styled-components";
import Product from "./Product";

const ProductsPage = () => {
	const [products, setProducts] = useState([]);
	const [pageNumber, setPageNumber] = useState(0);

	useEffect(async () => {
		const data = await (await fetch("api/products/")).json();
		setProducts(data.reverse());
	}, []);

	const productsPerPage = 9;
	const pagesVisited = pageNumber * productsPerPage;
	const pageCount = Math.ceil(products.length / productsPerPage);

	const displayProducts = products =>
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
			<Header />
			<ProductGrid displayProducts={displayProducts} products={products} />
			<Paginator pageCount={pageCount} setPageNumber={setPageNumber} />
			<GetInTouch />
			<Footer />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	background-color: var(--main-color);
	height: 100%;
`;

export default ProductsPage;
