import { useReducer } from "react";
import { ReviewType } from "../types/types";
import { Counter } from "./utils/Counter";


interface ReviewFormProps{
    onAddReview: (review: Omit<ReviewType, 'id'>) => void;
}


type Action =
        |{type: 'SET_USER'; payload: string}
        |{type: 'SET_TEXT'; payload: string}
        |{type: 'SET_RATING'; payload: number}
        |{type: 'RESET_FORM'};
    
        
    interface FormState {
        user: string;
        text: string;
        rating: number;
        counterKey: number;
    }    

    const initialState: FormState = {
        user: '',
        text: '',
        rating: 5,
        counterKey: 0
    }


    const formReducer = (state: FormState, action: Action): FormState => {
        switch (action.type) {
            case 'SET_USER':
                return {...state, user: action.payload};
            case 'SET_TEXT':
                return {...state, text: action.payload};
            case 'SET_RATING':
                if (state.rating === action.payload) return state;
                return { ...state, rating: action.payload };
            case 'RESET_FORM':
                 return { ...initialState, counterKey: state.counterKey + 1 };
            default:
                return state;           
        }
    }


    const inputStyle = {
        padding: '10px',
        border: '2px solid gray',
        borderRadius: '12px',
        fontFamily: 'MyRestaurantFont',
        fontSize: '14px',
        outline: 'none',
        width: '100%'
    };

    const ratingContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        border: '2px solid gray',
        borderRadius: '12px',
        backgroundColor: 'white',
        width: 'fit-content'
    };

    const buttonStyle = {
        ...inputStyle,
        backgroundColor: 'black',
        color: 'white',
        cursor: 'pointer',
        border: '2px solid gray',
        fontWeight: 'bold' as const
    };


const ReviewForm: React.FC<ReviewFormProps> = ({ onAddReview }) => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    
    const handleRatingChange = (newRating: number) => {
        dispatch({ type: 'SET_RATING', payload: newRating });
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        onAddReview({
            user: state.user,
            text: state.text,
            rating: state.rating
        });
        dispatch({type: 'RESET_FORM'});

    };

    const handleClear = () => {
        dispatch({ type: 'RESET_FORM' });
    };


    return (
        <form 
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '500px'
            }}
        >
            <input
                value={state.user}
                onChange={(e) => dispatch({type: 'SET_USER', payload: e.target.value})}
                placeholder="Name"
                style={inputStyle}
            />

            <textarea
                value={state.text}
                onChange={(e) => dispatch({type: 'SET_TEXT', payload: e.target.value})}
                placeholder="Your review of the restaurant"
                style={{...inputStyle, minHeight: '100px'}}
            />
            <div
                style={ratingContainerStyle}
            >
                <span style={{fontWeight: 'bold'}}>Rating:</span>
                <Counter
                    key={state.counterKey}
                    min={1} 
                    max={5}
                    initialValue={5}
                    onValueChange={handleRatingChange}
                />
            </div>
            <button 
                type="submit"
                style={buttonStyle}
            >
            Save review
            </button>
            <button 
                type="reset"
                style={buttonStyle}
                onClick={handleClear}
            >
            Clear
            </button>
        </form>
    );

};

export default ReviewForm;