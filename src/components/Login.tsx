import React, {useState} from "react";
import Header from "./Header";
import styled from "styled-components";
import TextInput from "../inputs/TextInput";
import Button from "@material-ui/core/Button";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<OuterWrapper>
			<Header isLinkVisible linktitle="Back" link="/" openInNewTab={false} />
			<InnerWrapper>
				<TextInput
					name="email"
					value={email}
					type="email"
					onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
					required
				/>
				<TextInput
					name="password"
					value={password}
					type="password"
					onChangeHandle={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(e.target.value)
					}
					required
				/>
				<Button variant="contained" color="primary">
					Log In
				</Button>
			</InnerWrapper>
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
	height: 80%;
	width: 100%;

	input {
		width: 50%;
		margin-bottom: 1.5em;

		@media only screen and (max-width: 480px) {
			width: 90%;
		}
	}
`;
