export const TOGGLE_SELECTED = "TOGGLE_SELECTED";

export const toggleSelected = (index) => {
    return({
        type: TOGGLE_SELECTED,
        payload: {
            index: index
        }
    });
};