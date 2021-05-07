export const TRACK_USER = "TRACK_USER";
export const SELECT_CURRENT_CHAT = "SELECT_CURRENT_CHAT";

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

export const selectCurrentChat = (id) => ({
    type: SELECT_CURRENT_CHAT,
    payload: {
        id,
    },
});
