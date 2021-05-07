import { useState } from "react";
import { projectFirestore } from "../firebase/config";

const useCollection = (collection) => {
    const [error, setError] = useState(null);

    const addDoc = async (doc) => {
        setError(null);
        try {
            await projectFirestore.collection(collection).add(doc);
        } catch (err) {
            console.log(err.message);
            setError("Could not send the message");
        }
    };
    return { error, addDoc };
};

export default useCollection;
