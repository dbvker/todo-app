import { TOGGLE_SELECTED } from './todoListActions';

const initialState = {
    selected: 0,
}

const todoListReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SELECTED:
            return {
                ...state,
                selected: action.payload.index,
            }
        default:
            return state;
    }
};

export default todoListReducer;