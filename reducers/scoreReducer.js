import { UPLOAD_SCORE } from "../constants";

const initialState = {
	scores: [],
};

const scoreReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPLOAD_SCORE:
			var arr = state.scores
				.concat(action.payload)
				.sort((a, b) => (a.score > b.score ? -1 : 1))
				.map((x, index) => {
					return {
						place: index + 1,
						name: x.name,
						score: x.score,
					};
				});
			return {
				...state,
				scores: arr,
			};
		default:
			return state;
	}
};

export default scoreReducer;
