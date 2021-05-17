import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { projectFirestore } from "../firebase/config";
import { useSelector } from "react-redux";

const ChatWindow = () => {
    const currentChatroom = useSelector((store) => store.currentChatroom);
    const chatWindow = useRef(null);
    const [documents, setDocuments] = useState(null);
    const [formattedDocuments, setFormattedDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);

    const getMessages = (chatroom) => {
        let collectionRef = projectFirestore
            .collection("chatroomMessages")
            .doc(chatroom);

        const unsubscribe = collectionRef.onSnapshot(
            (snap) => {
                let results = [];
                for (let message in snap.data()) {
                    snap.data()[message].sentAt &&
                        results.push({
                            ...snap.data()[message],
                        });
                }
                results.sort((a, b) => {
                    return a.sentAt - b.sentAt;
                });
                setDocuments(results);
                setError(null);
            },
            (err) => {
                console.log(err.message);
                setDocuments(null);
                setError("could not load data");
            }
        );
        setUnsubscribe(() => unsubscribe);
    };

    useEffect(() => {
        if (currentChatroom) getMessages(currentChatroom);
    }, [currentChatroom]);

    useEffect(() => {
        if (documents) {
            const formattedDocuments = documents.map((doc) => {
                let time = format(doc.sentAt.toDate(), "PPpp");
                return { ...doc, sentAt: time };
            });
            setFormattedDocuments(formattedDocuments);
        }
    }, [documents]);

    useEffect(() => {
        if (formattedDocuments) {
            const chat = chatWindow.current;
            chat.scrollTop = chat.scrollHeight;
        }
    }, [formattedDocuments]);

    useEffect(() => {
        if (unsubscribe) {
            return () => unsubscribe();
        }
    }, [unsubscribe]);

    return (
        <div className="chat-window">
            {error && <div className="error">{error}</div>}
            {formattedDocuments && (
                <div className="messages" ref={chatWindow}>
                    {formattedDocuments.map((doc) => (
                        <div className="single" key={doc.id}>
                            <span className="created-at">{doc.sentAt}</span>
                            <span className="name">{doc.sentBy}</span>
                            <span className="message">{doc.message}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
