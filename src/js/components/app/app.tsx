import * as React from "react";
import {Map, YMaps, YMapsApi} from "react-yandex-maps";
import {Point, PointCoordinates} from "../../common/types";

interface Props {
  points: Point[];
}

class App extends React.PureComponent<Props> {
  map: YMapsApi = null;
  points: Point[] = null;

  constructor(props: Props) {
    super(props);
    this.points = props.points;
  }

  render(): YMapsApi {
    return <YMaps
      query={{
        ns: `use-load-option`,
        load: `package.full`,
        apikey: `e96d0050-2264-41d5-9642-6f53fcf27474`,
      }}
    >
      <Map
        width={`100%`}
        height={`100vh`}
        defaultState={{
          center: [55.80, 49.11],
          zoom: 12,
          controls: ['zoomControl'],
        }}
        instanceRef={(ref: React.Ref<YMapsApi>): React.Ref<YMapsApi> => (this.map = ref)}
        onLoad={(ymaps: YMapsApi): void => this.handleMapLoad(ymaps)}
      />
    </YMaps>
  }

  handleMapLoad(ymaps: YMapsApi): void {
    const geoCollection = new ymaps.GeoObjectCollection();

    // Создаём коллекцию гео-объектов из исходных данных
    this.points.forEach((point: Point, index: number) => {
      geoCollection.add(new ymaps.Placemark([point.lat, point.lng], {
        balloonContentHeader: this.points[index].title,
        balloonContentBody: `<div>
          <img src="${this.points[index].image}" alt="${this.points[index].wikipedia_title}" width="128">
        </div>
        <div><b>Categories</b>: ${this.points[index].categories.join(`, `)}</div>`,
        balloonContentFooter: `<div><b>Ratings:</b></div>
          <div>Facebook: ${this.points[index].facebook_rating}
          | Foursquare: ${this.points[index].foursquare_rating}
          | TripAdvisor: ${this.points[index].tripAdvisor_rating}</div>`,
        hintContent: this.points[index].title,
      }, {
        preset: this.points[index].categories.includes(`Restaurant`) ? `islands#darkGreenIcon` : `islands#blueIcon`,
      }));
    });

    const geoCollectionSorted = new ymaps.GeoObjectCollection(); // точки маршрута, пронумерованные в порядке посещения
    const routePoints: PointCoordinates[] = []; // массив координат для построения маршрута
    let index = 1; // текст для метки на карте - соответствует порядку посещения
    let prevPoint; // предыдущая точка маршрута

    // Создаём массив координат точек маршрута, отсортированный в порядке посещения
    while(geoCollection.getLength()) {
      // Находим точку маршрута, ближайшую к предыдущей
      // За начальную точку принимаем самую северную
      const currentPoint = prevPoint ? ymaps.geoQuery(geoCollection).getClosestTo(prevPoint)
        : ymaps.geoQuery(geoCollection).getExtremeObject(`top`);

      // Присваиваем номер метке на карте
      currentPoint.properties.set(`iconContent`, index++);
      // Добавляем координаты точки маршрута в соответствующий массив
      routePoints.push(currentPoint.geometry.getCoordinates());
      // Переносим точку маршрута в коллекцию с "готовыми" точками
      geoCollectionSorted.add(currentPoint);
      prevPoint = currentPoint;
    }

    // Отображаем точки маршрута
    this.map.geoObjects.add(geoCollectionSorted);

    // Строим маршрут по сформированному массиву координат
    const route = new ymaps.multiRouter.MultiRoute({
      referencePoints: routePoints,
      params: {
        routingMode: `pedestrian`,
      }
    }, {
      routeActiveMarkerVisible: false,
      wayPointVisible: false,
      boundsAutoApply: true,
    });

    // Отображаем маршрут
    this.map.geoObjects.add(route);
  }
}

export default App;
