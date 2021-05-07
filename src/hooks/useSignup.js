import { useState } from "react";
import { projectAuth } from "../firebase/config";

const useSignup = () => {
    const regex = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{3,16}$/);
    const [error, setError] = useState(null);

    const signup = async (email, password, displayName) => {
        setError(null);

        try {
            if (regex.test(displayName)) {
                const res = await projectAuth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                if (!res) {
                    throw new Error("Could not complete the signup");
                }

                await res.user.updateProfile({ displayName });
                return res;
            } else {
                throw new Error(
                    `Username must be 3-16 characters long and may contain only letters, numbers and characters: "-", "_", "$", "@", "*", "!".`
                );
            }
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };
    return { error, signup };
};

export default useSignup;
