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

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#3f9bbe",
		},
	},
});

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
						localStorage.setItem("x-token", data.access);
						localStorage.setItem("refresh-token", data.refresh);
						history.push("/admin");
					} else if (Array.isArray(data.email)) {
						alert(data.email.reduce((acc, cur) => `${acc} ${cur}`.trim(), ""));
					} else if (Array.isArray(data.password)) {
						alert(data.password.reduce((acc, cur) => `${acc} ${cur}`.trim(), ""));
					} else {
						alert(data);
					}
				}
			);
	};

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="Back" link="/" openInNewTab={false} />

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
