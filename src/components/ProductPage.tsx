import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useQuery} from "../custom-hooks/useQuery";
import {TProduct} from "../types";
import Header from "./Header";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {isUserLoggedIn, JWTFetch} from "../utils/utils";
import {useHistory} from "react-router";

const ProductPage = () => {
	const [product, setProduct] = useState<TProduct | null>(null);

	const query = useQuery();
	const history = useHistory();

	const productId = Number(query.get("id"));

	const capFirst = (str?: string) => str && `${str[0].toUpperCase()}${str.slice(1)}`;

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		confirm(
			"Are you sure you want to delete your account? All associated data will be deleted as well."
		) &&
			JWTFetch(`${process.env.DJANGO_API_URL}/api/products/delete/${productId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(res => res.json())
				.then(data => {
					alert(data.msg);
					history.push("/");
				});
	};

	useEffect(() => {
		fetch(`${process.env.DJANGO_API_URL}/api/product/${productId}`)
			.then(res => res.json())
			.then(data => setProduct(data))
			.catch(e => history.push("/"));
	}, []);

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="home" link="/" openInNewTab={false} />
			<InnerWrapper>
				<ProductWrapper>
					{isUserLoggedIn() && (
						<IconWrapper onClick={handleDelete}>
							<DeleteForeverIcon />
						</IconWrapper>
					)}
					<ImageWrapper>
						<Image src={product?.image} />
					</ImageWrapper>
					<ContentWrapper>
						<ContentFrame>
							<h1>{capFirst(product?.title)}</h1>
							<h3>{product?.description}</h3>
							<h4>{product && `${product?.price} $`}</h4>
						</ContentFrame>
					</ContentWrapper>
				</ProductWrapper>
			</InnerWrapper>
		</OuterWrapper>
	);
};

const OuterWrapper = styled.div`
	background-color: var(--main-color);
	height: 100vh;

	@media only screen and (max-height: 480px) {
		height: 100%;
	}
`;

const InnerWrapper = styled.div`
	margin-top: 5em;
	height: 60vh;

	@media only screen and (max-width: 740px) {
		margin-top: 2em;
	}

	@media only screen and (max-height: 480px) {
		height: 100%;
		margin-top: 2em;
		padding-bottom: 3em;
	}
`;

const ProductWrapper = styled.div`
	position: relative;
	background-color: var(--main-color-light);
	height: 100%;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	box-shadow: var(--box-shadow);

	@media only screen and (min-width: 1200px) {
		width: 60%;
	}

	@media only screen and (max-width: 740px) {
		display: block;
		width: 100%;
		height: 40vh;
	}
`;

const ImageWrapper = styled.div`
	display: flex;
	width: 50%;
	height: inherit;

	@media only screen and (max-width: 740px) {
		width: 100%;
		height: 40vh;
	}
`;

const Image = styled.img`
	min-height: 100%;
	width: 100%;
	object-fit: cover;
	object-position: center;
	cursor: pointer;

	@media only screen and (max-width: 740px) {
		height: 19em;
		max-width: 100%;
	}
`;

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: end;
	justify-content: center;
	width: 50%;
	height: inherit;

	@media only screen and (max-width: 740px) {
		width: 100%;
	}
`;

const ContentFrame = styled.div`
	margin: 4em;

	h1 {
		font-size: var(--font-size-large);

		@media only screen and (max-width: 740px) {
			margin: 0em;
		}
	}

	h3 {
		font-size: var(--font-size-small);
		line-height: 1.7em;
		font-weight: 400;
	}

	@media only screen and (max-width: 1200px) {
		margin: 4em 4em 4em 2em;
	}
`;

const IconWrapper = styled.div`
	position: absolute;
	top: 5%;
	right: 5%;
	transition: color 0.4s;
	cursor: pointer;
	color: var(--text-color-dark);

	svg {
		font-size: 2rem;
	}

	:hover {
		color: var(--delete-color-hover);
	}
`;

export default ProductPage;
