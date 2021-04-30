import { useState } from "react";
import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

const Welcome = (props) => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="welcome container">
            <h1>Welcome to live-chat app</h1>
            {showLogin && (
                <div>
                    <h2>Log in</h2>
                    <LoginForm />
                    <p>
                        No account yet?{" "}
                        <span
                            onClick={() => {
                                setShowLogin(false);
                            }}
                        >
                            Sign up
                        </span>{" "}
                        instead
                    </p>
                </div>
            )}
            {!showLogin && (
                <div>
                    <h2>Sign up</h2>
                    <SignupForm updateUser={props.updateUser} />
                    <p>
                        Already registered?{" "}
                        <span
                            onClick={() => {
                                setShowLogin(true);
                            }}
                        >
                            Log in
                        </span>{" "}
                        instead
                    </p>
                </div>
            )}
        </div>
    );
};

export default Welcome;
