import { TOGGLE_SELECTED } from '../actions/todoListActions';

// const colors = {
//     orange: '255,104,31',
//     yellow: '250,183,30',
//     green: '26,208,134',
//     blue: '27,149,224',
//     red: '233,36,79',
//     pink: '245,142,169',
//     purple: '152,50,235',
//     grey: '100,100,100',
// };

const initialState = {
    selected: 2,
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