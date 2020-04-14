import "file-loader?name=[name].[ext]!../index.html";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import points from "./data/points";
import {Point} from "./common/types";

const init = (points: Point[]): void => {
  ReactDOM.render(
    <App points={points}/>,
    document.querySelector(`#root`)
  );
};

init(points);
