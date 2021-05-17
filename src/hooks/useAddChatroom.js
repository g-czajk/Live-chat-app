import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";

const useAddChatroom = () => {
    const [error, setError] = useState(null);

    const addChatroom = async (doc, user) => {
        setError(null);
        try {
            const res = await projectFirestore.collection("chatrooms").add(doc);
            await projectFirestore
                .collection("users")
                .doc(user)
                .update({
                    chatrooms: firebase.firestore.FieldValue.arrayUnion(res.id),
                });
            await projectFirestore
                .collection("chatroomMessages")
                .doc(res.id)
                .set({});
            return res;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };
    return { error, addChatroom };
};

export default useAddChatroom;
