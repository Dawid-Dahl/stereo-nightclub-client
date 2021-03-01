import React, {useState} from "react";
import styled from "styled-components";
import Header from "./Header";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {ThemeProvider} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {JWTFetch, getAndSetTokens} from "../utils/utils";
import {darkTheme, useStyles} from "../material-ui/styles";

type Props = {};

const AddProduct: React.FC<Props> = () => {
	const classes = useStyles();
	const history = useHistory();

	const [formData, setFormData] = useState({
		product: "",
		title: "",
		image: "",
		description: "",
		price: "",
	});

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

	const handleSelect = (e: React.ChangeEvent<{value: unknown}>) => {
		if (e.target.value) {
			setProduct(e.target.value as string);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			["product"]: product,
			[e.target.name]: e.target.value.trim(),
		});

		console.log(e.target.name);
		console.log(formData);
	};

	const handleSubmit = () => {};

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
								onChange={handleChange}
							/>
							<TextField
								id="outlined-number"
								label="Price"
								type="number"
								name="price"
								margin="normal"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={handleChange}
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
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
