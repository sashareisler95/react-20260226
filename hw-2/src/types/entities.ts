export type Id = string;

export type RestaurantEntity = {
  id: Id;
  name: string;
  menu: Id[];
  reviews: Id[];
};

export type DishEntity = {
  id: Id;
  name: string;
  price: number;
  ingredients: string[];
};

export type ReviewEntity = {
  id: Id;
  userId: Id;
  text: string;
  rating: number;
};

export type UserEntity = {
  id: Id;
  name: string;
};