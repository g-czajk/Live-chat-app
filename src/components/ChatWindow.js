import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { projectFirestore } from "../firebase/config";

const ChatWindow = () => {
    const chat = useRef(null);
    const [documents, setDocuments] = useState(null);
    const [formattedDocuments, setFormattedDocuments] = useState(null);
    const [error, setError] = useState(null);
    let unsubscribe;

    const getCollection = (collection) => {
        let collectionRef = projectFirestore
            .collection(collection)
            .orderBy("createdAt");

        unsubscribe = collectionRef.onSnapshot(
            (snap) => {
                let results = [];
                snap.docs.forEach((doc) => {
                    doc.data().createdAt &&
                        results.push({
                            ...doc.data(),
                            id: doc.id,
                        });
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
    };

    useEffect(() => {
        getCollection("messages");
    }, []);

    useEffect(() => {
        if (documents) {
            const formattedDocuments = documents.map((doc) => {
                let time = format(doc.createdAt.toDate(), "Pp");
                return { ...doc, createdAt: time };
            });
            setFormattedDocuments(formattedDocuments);
        }
    }, [documents]);

    useEffect(() => {
        if (formattedDocuments) {
            const chatWindow = chat.current;
            chatWindow.scrollTop = chatWindow.scrollHeight;
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
                <div className="messages" ref={chat}>
                    {formattedDocuments.map((doc) => (
                        <div className="single" key={doc.id}>
                            <span className="created-at">{doc.createdAt}</span>
                            <span className="name">{doc.name}</span>
                            <span className="message">{doc.message}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
