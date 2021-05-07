import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { timestamp } from "../firebase/config";
import useSendMessage from "../hooks/useSendMessage";

const ChatForm = () => {
    const user = useSelector((store) => store.user);
    const { addDoc, error } = useSendMessage("testMessages");

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const textarea = useRef(null);

    useEffect(() => {
        textarea.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            const chat = {
                name: user.displayName,
                message: message,
                createdAt: timestamp(),
            };

            if (message) {
                setIsSending(true);
                setMessage("");
                textarea.current.blur();

                await addDoc(chat);

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
            ></textarea>
            <div className="error">{error}</div>
        </form>
    );
};

export default ChatForm;
