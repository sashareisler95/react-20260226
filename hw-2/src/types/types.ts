export interface Menu {
  id: string;
  name: string;
  price?: number;
  ingredients?: Array<string>;
  count?: number;
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

export interface RestaurantTabProps {
    restaurant: RestaurantType;
    isActive: boolean;
    onClick: () => void;
}