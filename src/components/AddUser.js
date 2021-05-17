import { useState } from "react";
import useAddUserToChatroom from "../hooks/useAddUserToChatroom";
import { useSelector } from "react-redux";

const AddUser = () => {
    const currentChatroom = useSelector((store) => store.currentChatroom);

    const [newUser, setNewUser] = useState("");
    const { addUser, error } = useAddUserToChatroom();
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (newUser) {
                const newUserData = {
                    displayName: newUser,
                };
                setIsAdding(true);
                setNewUser("");
                await addUser(newUserData, currentChatroom);
                setIsAdding(false);
            }
        }
    };

    return (
        <div className="add-user">
            <form>
                <input
                    type="text"
                    placeholder={
                        !isAdding ? "Add user to chatroom" : "Adding..."
                    }
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    onKeyPress={(e) => {
                        handleSubmit(e);
                    }}
                    disabled={!currentChatroom}
                />
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default AddUser;
