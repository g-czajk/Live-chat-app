import { projectFirestore } from "../firebase/config";

// function updating lastVisited property in current user record in db

const setLastVisited = async (user, id) => {
    try {
        await projectFirestore
            .collection("users")
            .doc(user)
            .update({ lastVisited: id });
    } catch (err) {
        console.log(err.message);
    }
};

// actions code

export const TRACK_USER = "TRACK_USER";
export const SELECT_CURRENT_CHATROOM = "SELECT_CURRENT_CHATROOM";

export const trackUser = ({ uid, email, displayName }) => {
    return {
        type: TRACK_USER,
        payload: uid
            ? {
                  uid,
                  email,
                  displayName,
              }
            : null,
    };
};

export const selectCurrentChatroom = (chatroomId, user) => {
    if (chatroomId && user) {
        return async (dispatch) => {
            dispatch({
                type: SELECT_CURRENT_CHATROOM,
                payload: chatroomId,
            });

            await setLastVisited(user, chatroomId);
        };
    } else
        return {
            type: SELECT_CURRENT_CHATROOM,
            payload: null,
        };
};
