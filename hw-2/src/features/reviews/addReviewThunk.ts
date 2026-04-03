import type { AppDispatch } from "../../app/store";
import type { NewReviewPayload } from "./reviewsSlice.ts";
import { reviewCreated } from "./reviewsSlice.ts";
import { restaurantReviewAdded } from "../restaurants/restaurantsSlice";

export const addReview =
  (payload: NewReviewPayload) =>
  (dispatch: AppDispatch) => {
    const action = reviewCreated({
      userId: payload.userId,
      text: payload.text,
      rating: payload.rating,
    });

    const createdReviewId = action.payload.id;

    dispatch(action);
    dispatch(restaurantReviewAdded({ restaurantId: payload.restaurantId, reviewId: createdReviewId }));
  };