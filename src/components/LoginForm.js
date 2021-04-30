import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
    const { error, login } = useLogin();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (error) {
            setIsLoading(false);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoading(true);
            await login(email, password);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                required
                placeholder="email"
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
            {error && <div className="error">{error}</div>}
            <button>{!isLoading ? "Log in" : "Logging in..."}</button>
        </form>
    );
};

export default LoginForm;
