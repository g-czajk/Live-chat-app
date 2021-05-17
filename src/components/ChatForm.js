import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { timestamp } from "../firebase/config";
import useSendMessage from "../hooks/useSendMessage";
import { v4 as uuidv4 } from "uuid";

const ChatForm = () => {
    const user = useSelector((store) => store.user);
    const currentChatroom = useSelector((store) => store.currentChatroom);
    const { addMessage, error } = useSendMessage();

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textarea = useRef(null);

    useEffect(() => {
        textarea.current.focus();
    }, [currentChatroom]);

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            if (message) {
                e.preventDefault();
                setIsSending(true);

                const uuid = uuidv4();

                const chatMessage = {};

                chatMessage[uuid] = {
                    id: uuid,
                    sentBy: user.displayName,
                    message,
                    sentAt: timestamp(),
                };

                setMessage("");
                textarea.current.blur();

                await addMessage(chatMessage, currentChatroom);

                textarea.current.focus();
                setIsSending(false);
            } else {
                textarea.current.blur();
                setTimeout(() => {
                    textarea.current.focus();
                }, 0);
            }
        }
    };

    return (
        <form className="chat-form">
            <textarea
                ref={textarea}
                placeholder={
                    !isSending
                        ? "Type a message and hit enter to send"
                        : "Sending..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                    handleSubmit(e);
                }}
                disabled={!currentChatroom}
            ></textarea>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default ChatForm;
