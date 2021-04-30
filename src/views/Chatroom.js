import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatForm from "../components/ChatForm";

const Chatroom = (props) => {
    return (
        <div className="container">
            <Navbar user={props.user} />
            <ChatWindow />
            <ChatForm user={props.user} />
        </div>
    );
};

export default Chatroom;
