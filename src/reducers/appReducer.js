import { TRACK_USER, SELECT_CURRENT_CHAT } from "../actions/appActions";

export const appReducer = (state = {}, action) => {
    switch (action.type) {
        case TRACK_USER:
            return { user: action.payload };
        case SELECT_CURRENT_CHAT:
            return;
        default:
            console.warn(`No action of type: ${action.type}`);
            return state;
    }
};
