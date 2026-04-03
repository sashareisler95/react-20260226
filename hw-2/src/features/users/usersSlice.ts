import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { UserEntity } from "../../types/entities";

const usersAdapter = createEntityAdapter<UserEntity>();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    usersLoaded: usersAdapter.setAll,
  },
});

export const { usersLoaded } = usersSlice.actions;
export default usersSlice.reducer;

export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users
);