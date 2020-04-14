type Timetable = {
  1?: number[];
  2?: number[];
  3?: number[];
  4?: number[];
  5?: number[];
  6?: number[];
  7?: number[];
};

type PointCoordinates = [number, number];

type Point = {
  additional_categories: string[];
  address: string;
  categories: string[];
  city_brand: string[];
  duration: number;
  facebook_checkins: number;
  facebook_rating: number;
  foursquare_checkinsCount: number;
  foursquare_rating: number;
  foursquare_ratingVotes: number;
  foursquare_userCount: number;
  image: string;
  instagram_title: string;
  instagram_visitorsNumber: number;
  lat: number;
  lng: number;
  open_hours: Timetable;
  title: string;
  tripAdvisor_rating: number;
  tripAdvisor_reviewsNumber: number;
  wikipedia_page: number;
  wikipedia_title: string;
  x: number;
  y: number;
  IntervalNumber: number;
};

export {PointCoordinates, Point};
