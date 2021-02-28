import React from "react";
import ProductsPage from "./components/ProductsPage";
import ProductPage from "./components/ProductPage";
import {Switch, Route} from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Register from "./components/Register";

const App: React.FC = () => {
	return (
		<>
			<Switch>
				<Route path="/product" component={ProductPage} />
				<Route path="/admin" component={Admin} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route exact path="/" component={ProductsPage} />
			</Switch>
		</>
	);
};
export default App;
