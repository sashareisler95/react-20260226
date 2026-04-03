import { useReducer } from "react";
import { Counter } from "./utils/Counter";
import "../styles/ReviewForm.css";
import { useAppSelector } from "../app/hooks";
import { usersSelectors } from "../features/users/usersSlice";
import type { Id } from "../types/entities";

interface ReviewFormProps {
  onAddReview: (review: { userId: Id; text: string; rating: number }) => void;
}

type Action =
  | { type: "SET_USER"; payload: string }
  | { type: "SET_TEXT"; payload: string }
  | { type: "SET_RATING"; payload: number }
  | { type: "RESET_FORM" };

interface FormState {
  userId: Id | "";
  text: string;
  rating: number;
}

const initialState: FormState = { userId: "", text: "", rating: 5 };

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userId: action.payload };
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "SET_RATING":
      return state.rating === action.payload ? state : { ...state, rating: action.payload };
    case "RESET_FORM":
      return initialState;
  }
};

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const users = useAppSelector(usersSelectors.selectAll);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.userId) return;

    onAddReview({ userId: state.userId, text: state.text, rating: state.rating });
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">New review:</h3>

      <select
        className="review-form__input"
        value={state.userId}
        onChange={(e) => dispatch({ type: "SET_USER", payload: e.target.value })}
      >
        <option value="" disabled>
          Select user
        </option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <textarea
        className="review-form__textarea"
        value={state.text}
        onChange={(e) => dispatch({ type: "SET_TEXT", payload: e.target.value })}
        placeholder="Your review of the restaurant"
      />

      <div className="review-form__rating">
        <span className="review-form__rating-label">Rating:</span>
        <Counter
          value={state.rating}
          min={0}
          max={5}
          onValueChange={(r) => dispatch({ type: "SET_RATING", payload: r })}
        />
      </div>

      <div className="review-form__buttons">
        <button type="submit" className="review-form__button review-form__button--primary">
          Save review
        </button>
        <button
          type="button"
          className="review-form__button review-form__button--secondary"
          onClick={() => dispatch({ type: "RESET_FORM" })}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;