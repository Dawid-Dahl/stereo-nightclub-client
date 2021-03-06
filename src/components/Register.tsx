import React, {useState} from "react";
import Header from "./Header";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {ThemeProvider} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {getAndSetTokens} from "../utils/utils";
import {darkTheme, useStyles} from "../material-ui/styles";

const Register = () => {
	const history = useHistory();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		user_name: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const classes = useStyles();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetch(`${process.env.DJANGO_API_URL}/api/users/register/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.freeze(formData)),
		})
			.then(res => res.json())
			.then(
				(data: {
					email?: string | string[];
					user_name?: string | string[];
					password?: string | string[];
				}) => {
					if (data.email && data.user_name) {
						getAndSetTokens(formData.email, formData.password).then(tokens => {
							if (tokens) {
								history.push("/admin");
							} else {
								alert("We couldn't log you in at this time.");
							}
						});
					} else if (Array.isArray(data.email)) {
						alert(data.email.reduce((acc, cur) => `${acc} ${cur}`.trim(), ""));
					} else if (Array.isArray(data.password)) {
						alert(data.password.reduce((acc, cur) => `${acc} ${cur}`.trim(), ""));
					} else {
						alert(data);
					}
				}
			)
			.catch(console.error);
	};

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="home" link="/" openInNewTab={false} />

			<ThemeProvider theme={darkTheme}>
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar} style={{backgroundColor: "#3f9bbe"}}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Register
						</Typography>
						<form className={classes.form} onSubmit={handleSubmit}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="user_name"
								label="Username"
								type="user_name"
								id="user_name"
								onChange={handleChange}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="default"
								className={classes.submit}
							>
								Register
							</Button>
							<Grid container>
								<Grid item>
									<Link href="/login" variant="body2">
										{"Already registered? Log in"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</ThemeProvider>
		</OuterWrapper>
	);
};

export default Register;

const OuterWrapper = styled.div`
	background-color: var(--main-color);
	height: 100vh;
`;

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: white;
`;
