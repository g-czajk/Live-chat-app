import { TRACK_USER, SELECT_CURRENT_CHATROOM } from "../actions/appActions";

export const appReducer = (
    state = { user: null, currentChatroom: null },
    action
) => {
    switch (action.type) {
        case TRACK_USER:
            return { ...state, user: action.payload };
        case SELECT_CURRENT_CHATROOM:
            return { ...state, currentChatroom: action.payload };
        default:
            return state;
    }
};
