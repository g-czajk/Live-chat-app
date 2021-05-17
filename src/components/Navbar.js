import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { logout, error } = useLogout();
    const user = useSelector((store) => store.user);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav>
            <div>
                <p>
                    Hey there <span>{user.displayName}</span>!
                </p>
                <p className="email">
                    Currently logged in as... <span>{user.email}</span>
                </p>
                {error && <div className="error">{error}</div>}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
