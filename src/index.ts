import ReactDOM from "react-dom";
import {Router, Route, Switch} from "react-router-dom";
import App from "./App";

ReactDOM.render(
	<Router>
		<Route path="/" component={App} />
	</Router>,
	document.getElementById("root")
);
