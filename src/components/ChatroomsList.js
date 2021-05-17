import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { projectFirestore } from "../firebase/config";
import SingleChatroom from "./SingleChatroom";

const ChatroomsList = () => {
    const user = useSelector((store) => store.user);
    const [chatsData, setChatsData] = useState(null);
    const [error, setError] = useState(null);
    let unsubscribe;

    const getChatsData = async (user) => {
        try {
            let collectionRef = projectFirestore
                .collection("chatrooms")
                .where("members", "array-contains", `${user}`)
                .orderBy("createdAt", "desc");

            unsubscribe = collectionRef.onSnapshot(
                (snap) => {
                    let chatsData = [];
                    snap.docs.forEach((doc) => {
                        chatsData.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    });

                    setChatsData(chatsData);
                    setError(null);
                },
                (err) => {
                    console.log(err.message);
                    setChatsData(null);
                    setError("could not load data");
                }
            );
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        getChatsData(user.uid);
    }, []);

    useEffect(() => {
        if (unsubscribe) {
            return () => unsubscribe();
        }
    }, [unsubscribe]);

    return (
        <div className="chatrooms-list">
            {error && <div className="error">{error}</div>}
            {chatsData &&
                chatsData.map((doc, index) => (
                    <SingleChatroom key={doc.id} data={chatsData[index]} />
                ))}
        </div>
    );
};

export default ChatroomsList;
