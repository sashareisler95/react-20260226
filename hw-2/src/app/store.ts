import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "../features/restaurants/restaurantsSlice";
import dishesReducer from "../features/dishes/dishesSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    dishes: dishesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;