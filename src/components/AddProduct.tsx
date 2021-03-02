import React, {useState} from "react";
import styled from "styled-components";
import Header from "./Header";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {ThemeProvider} from "@material-ui/core/styles";
import {darkTheme, useStyles} from "../material-ui/styles";
import {JWTFetch} from "../utils/utils";

type Props = {};

const AddProduct: React.FC<Props> = () => {
	const classes = useStyles();

	const formDataDefault = {
		product_type: "",
		title: "",
		image: "",
		description: "",
		price: 0,
	};

	const [formData, setFormData] = useState(formDataDefault);

	const options = [
		{
			value: "Drink",
			label: "Drink",
		},
		{
			value: "Food",
			label: "Food",
		},
	];

	const [product, setProduct] = useState(options[0].value);
	const [price, setPrice] = useState(0);

	const resetFields = () => (setFormData(formDataDefault), setPrice(0));

	const handleSelect = (e: React.ChangeEvent<{value: unknown}>) => {
		if (e.target.value) {
			setProduct(e.target.value as string);
		}
	};

	const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(parseInt(e.target.value));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		formData["product_type"] = product.toUpperCase();
		formData["price"] = price;
		e.preventDefault();
		JWTFetch(`${process.env.DJANGO_API_URL}/api/products/create/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.freeze(formData)),
		})
			.then(res => res.json())
			.then((data: any) => {
				alert(`Your product ${data.title} was added successfully!`);
				resetFields();
			})
			.catch(e => {
				console.error(e);
				alert("Are you trying to add a drink without being logged in? Fat chance...");
			});
	};

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="home" link="/" openInNewTab={false} />

			<ThemeProvider theme={darkTheme}>
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar} style={{backgroundColor: "#3f9bbe"}}>
							<LocalBarIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Add A Product
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								id="standard-select-product"
								select
								label="Select"
								value={product}
								onChange={handleSelect}
								helperText="Please select your type of product"
							>
								{options.map(option => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="title"
								label="Product Name"
								type="text"
								id="title"
								value={formData["title"]}
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="image"
								label="Image Url"
								type="text"
								id="image"
								value={formData["image"]}
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="description"
								label="Description"
								type="text"
								id="description"
								value={formData["description"]}
								onChange={handleChange}
							/>
							<TextField
								id="outlined-number"
								label="Price"
								type="number"
								name="price"
								margin="normal"
								value={price}
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={handlePrice}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="default"
								className={classes.submit}
							>
								Add
							</Button>
						</form>
					</div>
				</Container>
			</ThemeProvider>
		</OuterWrapper>
	);
};

export default AddProduct;

const OuterWrapper = styled.div`
	background-color: var(--main-color);
	height: 100vh;

	@media only screen and (max-height: 480px) {
		height: 100%;
	}
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
