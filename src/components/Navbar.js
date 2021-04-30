import useLogout from "../hooks/useLogout";

const Navbar = (props) => {
    const { logout, error } = useLogout();
    const user = props.user;

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
