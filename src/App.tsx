import React from "react";
import ProductsPage from "./components/ProductsPage";
import {Switch, Route} from "react-router-dom";

const App: React.FC = () => {
	return (
		<>
			<Switch>
				<Route path="/" component={ProductsPage} />
			</Switch>
		</>
	);
};
export default App;
