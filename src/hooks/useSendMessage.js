import { useState } from "react";
import { projectFirestore } from "../firebase/config";

const useSendMessage = () => {
    const [error, setError] = useState(null);

    const addMessage = async (message, chatroom) => {
        setError(null);

        try {
            await projectFirestore
                .collection("chatroomMessages")
                .doc(chatroom)
                .update(message);
        } catch (err) {
            console.log(err.message);
            setError("Could not send the message");
        }
    };
    return { error, addMessage };
};

export default useSendMessage;
