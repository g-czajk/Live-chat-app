import AddUser from "../components/AddUser";
import UsersList from "../components/UsersList";

const UsersPanel = () => {
    return (
        <div className="users-panel">
            <p className="current-chatroom">
                Current chatroom: <span>Chat1</span>
            </p>
            <div className="users-panel-container">
                <UsersList />
                <AddUser />
            </div>
        </div>
    );
};

export default UsersPanel;
