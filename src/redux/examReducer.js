import * as types from './types'

export const initState = {
    exams: [],
    exam:{
        
    }
};

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_ALL_EXAM:
            return { ...state, exams: action.payload };
        case types.FETCH_ONE_EXAM:
            return { ...state, exams: action.payload };
        case types.SUBMIT_EXAM:
            return { ...state, result: action.payload };
        case types.ADD_EXAM:
            return { ...state, exams: action.payload };
        case types.UPDATE_EXAM:
            return { ...state, exams: action.payload };
        case types.DELETE_EXAM:
            return { ...state, exams: action.payload };
        case types.FETCH_EXAM_BY_ID:
            return { ...state, exam: action.payload };
        default:
            return state;
    }
}

export default reducer;