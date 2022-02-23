import { ADD_TITLE } from './newListActions';

const colors = {
    orange: '255,104,31',
    yellow: '250,183,30',
    green: '26,208,134',
    blue: '27,149,224',
    red: '233,36,79',
    pink: '245,142,169',
    purple: '152,50,235',
    grey: '100,100,100',
};

const initialState = {
    id: Date.now(),
    title: '',
    color: colors.orange,
    tasks: [],
}

const newListReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TITLE:
            return {
                ...state,
                title: action.payload.title,
            }
        default:
            return state;
    }
};

export default newListReducer;
