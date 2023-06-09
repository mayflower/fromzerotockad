import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
