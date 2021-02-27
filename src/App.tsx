import React from "react";
import ProductsPage from "./components/ProductsPage";
import ProductPage from "./components/ProductPage";
import {Switch, Route} from "react-router-dom";

const App: React.FC = () => {
	return (
		<>
			<Switch>
				<Route exact path="/" component={ProductsPage} />
				<Route path="/product" component={ProductPage} />
			</Switch>
		</>
	);
};
export default App;
