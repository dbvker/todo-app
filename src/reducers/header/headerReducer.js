import { TOGGLE_THEME } from './headerActions';

const initialState = {
    theme: true,
}

const headerReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                theme: !state.theme,
            }
        default:
            return state;
    }
};

export default headerReducer;