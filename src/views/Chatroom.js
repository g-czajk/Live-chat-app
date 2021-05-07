import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatForm from "../components/ChatForm";
import ChatroomsPanel from "../components/ChatroomsPanel";
import UsersPanel from "../components/UsersPanel";

const Chatroom = () => {
    return (
        <div className="container">
            <div className="chatroom">
                <Navbar />
                <ChatroomsPanel />
                <UsersPanel />
                <ChatWindow />
                <ChatForm />
            </div>
        </div>
    );
};

export default Chatroom;
