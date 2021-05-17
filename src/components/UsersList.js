import { useSelector } from "react-redux";
import { projectFirestore } from "../firebase/config";
import { useState, useEffect } from "react";

const UsersList = () => {
    const currentChatroom = useSelector((store) => store.currentChatroom);
    const [usersInChatroom, setUsersInChatroom] = useState(null);
    const [error, setError] = useState(null);
    const [unsubscribe, setUnsubscribe] = useState(null);

    const getUsersInChatroom = async (chatroom) => {
        try {
            let collectionRef = projectFirestore
                .collection("users")
                .where("chatrooms", "array-contains", `${chatroom}`)
                .orderBy("displayName");

            const unsubscribe = collectionRef.onSnapshot(
                (snap) => {
                    let users = [];
                    snap.docs.forEach((doc) => {
                        users.push({
                            ...doc.data(),
                            id: doc.id,
                        });
                    });

                    setUsersInChatroom(users);
                    setError(null);
                },
                (err) => {
                    console.log(err.message);
                    setUsersInChatroom(null);
                    setError("could not load data");
                }
            );
            setUnsubscribe(() => unsubscribe);
        } catch (err) {
            console.error(err.message);
            setError(err.message);
        }
    };

    useEffect(() => {
        if (currentChatroom) getUsersInChatroom(currentChatroom);
    }, [currentChatroom]);

    useEffect(() => {
        if (unsubscribe) {
            return () => unsubscribe();
        }
    }, [unsubscribe]);

    return (
        <div className="users-list">
            <p className="title">Users in chatroom:</p>
            <div className="users">
                {error && <div className="error">{error}</div>}
                {usersInChatroom &&
                    usersInChatroom.map((user) => (
                        <div className="user" key={user.id}>
                            {user.displayName}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default UsersList;
