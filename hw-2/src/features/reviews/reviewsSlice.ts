import { createEntityAdapter, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Id, ReviewEntity } from "../../types/entities";

const reviewsAdapter = createEntityAdapter<ReviewEntity>();

type NewReviewPayload = {
  restaurantId: Id;
  userId: Id;
  text: string;
  rating: number;
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: reviewsAdapter.getInitialState(),
  reducers: {
    reviewsLoaded: reviewsAdapter.setAll,
    reviewCreated: {
      reducer: (state, action: PayloadAction<ReviewEntity>) => {
        reviewsAdapter.addOne(state, action.payload);
      },
      prepare: (payload: Omit<ReviewEntity, "id">) => ({
        payload: { ...payload, id: nanoid() },
      }),
    },
  },
});

export const { reviewsLoaded, reviewCreated } = reviewsSlice.actions;
export default reviewsSlice.reducer;

export const reviewsSelectors = reviewsAdapter.getSelectors<RootState>(
  (state) => state.reviews
);

export type { NewReviewPayload };