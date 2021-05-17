import { useState } from "react";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";

const useAddUserToChatroom = () => {
    const [error, setError] = useState(null);

    const addUser = async (doc, chatroom) => {
        setError(null);
        try {
            const checkIfUserExists = await projectFirestore
                .collection("users")
                .where("displayName", "==", `${doc.displayName}`)
                .get();

            if (!checkIfUserExists.empty) {
                if (
                    checkIfUserExists.docs[0]
                        .data()
                        .chatrooms.includes(chatroom)
                ) {
                    throw new Error(`"${doc.displayName}" is already here`);
                }

                await projectFirestore
                    .collection("users")
                    .doc(checkIfUserExists.docs[0].id)
                    .update({
                        chatrooms:
                            firebase.firestore.FieldValue.arrayUnion(chatroom),
                    });

                await projectFirestore
                    .collection("chatrooms")
                    .doc(chatroom)
                    .update({
                        members: firebase.firestore.FieldValue.arrayUnion(
                            checkIfUserExists.docs[0].id
                        ),
                    });
            } else {
                throw new Error(`user "${doc.displayName}" does not exist`);
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };
    return { error, addUser };
};

export default useAddUserToChatroom;
