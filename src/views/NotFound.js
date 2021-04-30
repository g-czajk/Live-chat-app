import { useHistory } from "react-router-dom";

const NotFound = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    };

    return (
        <div className="container">
            <div className="not-found">
                <h1>Oops...</h1>
                <h1 className="four-zero-four">404</h1>
                <p>The page you requested has not been found.</p>
                <button onClick={handleClick}>Go to homepage</button>
            </div>
        </div>
    );
};

export default NotFound;
