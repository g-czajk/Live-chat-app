import { useEffect, useState } from "react";
import useSignup from "../hooks/useSignup";

const SignupForm = (props) => {
    const { error, signup } = useSignup();

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [passwordMatchCheck, setPasswordMatchCheck] = useState(null);
    const [checkbox, setCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateUser = props.updateUser;

    useEffect(() => {
        if (error) {
            setIsLoading(false);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (displayName && email && password && repeatedPassword && checkbox) {
            if (password === repeatedPassword) {
                setPasswordMatchCheck(null);
                setIsLoading(true);
                await signup(email, password, displayName);
                updateUser();
            } else {
                setPasswordMatchCheck(
                    "Password and repeated password do not match. Please try again."
                );
                setIsLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                required
                placeholder="nickname"
                name="display-name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
                type="email"
                required
                placeholder="email (may be fake)"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                required
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
                <input
                    type="password"
                    required
                    placeholder="repeat password"
                    name="repeted-password"
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                />
            )}
            <div className="checkbox-wrap">
                <input
                    type="checkbox"
                    required
                    name="check"
                    value={checkbox}
                    onChange={(e) => setCheckbox(e.target.checked)}
                />
                <label htmlFor="name">
                    I understand that this is only a test version of the app and
                    all the messages sent through it are avaliable publicly
                    (anyone can log in and see them).
                </label>
            </div>
            {error && <div className="error">{error}</div>}
            {passwordMatchCheck && (
                <div className="error">{passwordMatchCheck}</div>
            )}
            <button>{!isLoading ? "Sign up" : "Creating user..."}</button>
        </form>
    );
};

export default SignupForm;
