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
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {JWTFetch} from "../utils/utils";
import {darkTheme, useStyles} from "../material-ui/styles";

const Login = () => {
	const history = useHistory();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
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

		fetch(`${process.env.DJANGO_API_URL}/api/token/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(Object.freeze(formData)),
		})
			.then(res => res.json())
			.then(data => {
				if (data.access && data.refresh) {
					localStorage.setItem("x-token", data.access);
					localStorage.setItem("refresh-token", data.refresh);
					history.push("/admin");
				} else {
					alert(data.detail);
				}
			})
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
							Sign in
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
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="default"
								className={classes.submit}
							>
								Sign In
							</Button>
							<Grid container>
								{/* <Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid> */}
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
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

export default Login;

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
