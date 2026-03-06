export interface Menu {
  id: string;
  name: string;
  price?: number;
  ingredients?: Array<string>;
}

export interface Review {
    id: string;
    user: string;
    text: string;
    rating: number;
}

export interface RestaurantType {
  id: string;
  name: string;
  menu?: Array<Menu>;
  reviews?: Array<Review>;
}