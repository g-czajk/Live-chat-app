import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatForm from "../components/ChatForm";
import ChatroomsPanel from "../components/ChatroomsPanel";
import UsersPanel from "../components/UsersPanel";
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { selectCurrentChatroom } from "../actions/appActions";

const Chatroom = (props) => {
    const user = useSelector((store) => store.user);
    const [lastVisited, setLastVisited] = useState(null);

    const [error, setError] = useState(null);

    const getUserData = async (user) => {
        try {
            const res = await projectFirestore
                .collection("users")
                .doc(user)
                .get();
            if (res.data()) setLastVisited(res.data().lastVisited);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        getUserData(user.uid);
    }, []);

    useEffect(() => {
        if (lastVisited) {
            props.selectCurrentChatroom(lastVisited, user.uid);
        }
    }, [lastVisited]);

    useEffect(() => {
        return () => {
            props.selectCurrentChatroom(null, null);
        };
    }, []);

    return (
        <div className="container">
            <div className="chatroom">
                <Navbar />
                <ChatroomsPanel />
                <UsersPanel />
                <ChatWindow />
                <ChatForm />
                {error && <div className="error">{error}</div>}
            </div>
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

export default connect(null, mapDispatchToProps)(Chatroom);
