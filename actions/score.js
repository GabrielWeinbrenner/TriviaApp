import { UPLOAD_SCORE } from "../constants";
export function uploadScore(score) {
	return {
		type: UPLOAD_SCORE,
		payload: score,
	};
}
