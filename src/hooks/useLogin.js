import { useState } from "react";
import { projectAuth } from "../firebase/config";

const useLogin = () => {
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setError(null);

        try {
            const res = await projectAuth.signInWithEmailAndPassword(
                email,
                password
            );
            return res;
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };
    return { error, login };
};

export default useLogin;
