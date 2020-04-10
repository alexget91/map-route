import * as React from "react";
import {Map, YMaps} from "react-yandex-maps";

const App = () => (
  <YMaps>
    <Map defaultState={{center: [55.75, 37.57], zoom: 9}}/>
  </YMaps>
);

export default App;
