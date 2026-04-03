import type { DishEntity, Id, ReviewEntity } from "./entities";

export type DishVM = DishEntity;

export type ReviewVM = ReviewEntity & {
  user: string;
};

export type RestaurantVM = {
  id: Id;
  name: string;
  menu: DishVM[];
  reviews: ReviewVM[];
};