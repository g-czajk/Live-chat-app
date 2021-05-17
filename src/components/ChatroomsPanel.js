import { useState } from "react";

import AddChatroom from "../components/AddChatroom";
import ChatroomsList from "../components/ChatroomsList";

const ChatroomsPanel = () => {
    const [isAdding, setIsAdding] = useState(false);

    const handleChangeIsAdding = () => {
        setIsAdding((prevState) => !prevState);
    };

    const showAddFormOrChatroomsList = isAdding ? (
        <AddChatroom handleChangeIsAdding={handleChangeIsAdding} />
    ) : (
        <div>
            <p className="your-chatrooms">Your chatrooms:</p>
            <ChatroomsList />
        </div>
    );

    return (
        <div className="chatrooms-panel">
            <button className="toggle-add-chat" onClick={handleChangeIsAdding}>
                {!isAdding ? "Add new chat" : "Back to list"}
            </button>
            {showAddFormOrChatroomsList}
        </div>
    );
};

export default ChatroomsPanel;
