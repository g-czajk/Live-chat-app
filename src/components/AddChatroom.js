import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { timestamp } from "../firebase/config";
import useAddChatroom from "../hooks/useAddChatroom";
import { selectCurrentChatroom } from "../actions/appActions";

const AddChatroom = (props) => {
    const user = useSelector((store) => store.user);

    const [chatroomName, setChatroomName] = useState("");
    const [chatroomDescription, setChatroomDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { addChatroom, error } = useAddChatroom();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (chatroomName && chatroomDescription) {
            setIsLoading(true);
            const newChatroom = {
                name: chatroomName,
                createdBy: user.uid,
                description: chatroomDescription,
                members: [user.uid],
                createdAt: timestamp(),
            };
            const res = await addChatroom(newChatroom, user.uid);
            setIsLoading(false);
            if (res) {
                setChatroomName("");
                setChatroomDescription("");
                props.selectCurrentChatroom(res.id, user.uid);
                props.handleChangeIsAdding();
            }
        }
    };

    return (
        <div className="add-chatroom">
            <p>Add new chatroom:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Chatroom name"
                    maxLength="40"
                    value={chatroomName}
                    onChange={(e) => setChatroomName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Short description"
                    maxLength="60"
                    value={chatroomDescription}
                    onChange={(e) => setChatroomDescription(e.target.value)}
                    required
                />
                <button>{!isLoading ? "Add" : "Adding..."}</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectCurrentChatroom: (id, user) => {
            dispatch(selectCurrentChatroom(id, user));
        },
    };
};

export default connect(null, mapDispatchToProps)(AddChatroom);
