import { useReducer } from "react";
import { ReviewType } from "../types/types";
import { Counter } from "./utils/Counter";
import "../styles/ReviewForm.css";

interface ReviewFormProps {
    onAddReview: (review: Omit<ReviewType, 'id'>) => void;
}

type Action =
    | { type: 'SET_USER'; payload: string }
    | { type: 'SET_TEXT'; payload: string }
    | { type: 'SET_RATING'; payload: number }
    | { type: 'RESET_FORM' };

interface FormState {
    user: string;
    text: string;
    rating: number;
}

const initialState: FormState = {
    user: '',
    text: '',
    rating: 5
};

const formReducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_TEXT':
            return { ...state, text: action.payload };
        case 'SET_RATING':
            if (state.rating === action.payload) return state;
            return { ...state, rating: action.payload };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
};

const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleRatingChange = (newRating: number) => {
        dispatch({ type: 'SET_RATING', payload: newRating });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddReview({
            user: state.user,
            text: state.text,
            rating: state.rating
        });
        dispatch({ type: 'RESET_FORM' });
    };

    const handleClear = () => {
        dispatch({ type: 'RESET_FORM' });
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h3 className="review-form__title">New review:</h3>
            
            <input
                className="review-form__input"
                value={state.user}
                onChange={(e) => dispatch({ type: 'SET_USER', payload: e.target.value })}
                placeholder="Name"
            />

            <textarea
                className="review-form__textarea"
                value={state.text}
                onChange={(e) => dispatch({ type: 'SET_TEXT', payload: e.target.value })}
                placeholder="Your review of the restaurant"
            />
            
            <div className="review-form__rating">
                <span className="review-form__rating-label">Rating:</span>
                <Counter
                    value={state.rating}
                    min={1}
                    max={5}
                    onValueChange={handleRatingChange}
                />
            </div>
            
            <div className="review-form__buttons">
                <button type="submit" className="review-form__button review-form__button--primary">
                    Save review
                </button>
                <button 
                    type="button" 
                    className="review-form__button review-form__button--secondary"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;