import { useState, useEffect, useRef } from "react";
import { timestamp } from "../firebase/config";
import useCollection from "../hooks/useCollection";

const ChatForm = (props) => {
    const user = props.user;
    const { addDoc, error } = useCollection("messages");

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textarea = useRef(null);

    useEffect(() => {
        textarea.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            setIsSending(true);

            const chat = {
                name: user.displayName,
                message: message,
                createdAt: timestamp(),
            };

            setMessage("");
            textarea.current.blur();

            await addDoc(chat);

            textarea.current.focus();
            setIsSending(false);
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
            ></textarea>
            <div className="error">{error}</div>
        </form>
    );
};

export default ChatForm;
