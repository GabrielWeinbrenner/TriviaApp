import { UPLOAD_SCORE } from "../constants";

const initialState = {
	scores: [],
};

const scoreReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_SCORE:
			return {
				...state,
				scores: state.scores.concat(action.payload),
			};
		default:
			return state;
	}
};

export default scoreReducer;
