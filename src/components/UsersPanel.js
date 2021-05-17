import AddUser from "../components/AddUser";
import UsersList from "../components/UsersList";
import { useSelector } from "react-redux";
import { projectFirestore } from "../firebase/config";
import { useState, useEffect } from "react";

const UsersPanel = () => {
    const currentChatroom = useSelector((store) => store.currentChatroom);
    const [currentChatroomName, setCurrentChatroomName] = useState(null);
    const [error, setError] = useState(null);

    const getCurrentChatroomName = async (chatroom) => {
        try {
            const res = await projectFirestore
                .collection("chatrooms")
                .doc(chatroom)
                .get();
            if (res.data()) setCurrentChatroomName(res.data().name);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (currentChatroom) getCurrentChatroomName(currentChatroom);
    }, [currentChatroom]);

    return (
        <div className="users-panel">
            {error && <div className="error">{error}</div>}
            <p className="current-chatroom">
                Current chatroom:{" "}
                {currentChatroomName && <span>{currentChatroomName}</span>}
            </p>

            <div className="users-panel-container">
                <UsersList />
                <AddUser />
            </div>
        </div>
    );
};

export default UsersPanel;
