import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { selectCurrentChatroom } from "../actions/appActions";

const SingleChatroom = (props) => {
    const name = props.data.name;
    const description = props.data.description;
    const id = props.data.id;
    const user = useSelector((store) => store.user);
    const currentChatroom = useSelector((store) => store.currentChatroom);

    const handleClick = () => {
        props.selectCurrentChatroom(id, user.uid);
    };

    useEffect(() => {
        if (currentChatroom) {
            const chatBars = document.querySelectorAll(".single-chatroom");
            chatBars.forEach((bar) => {
                bar.classList.remove("current");
            });
            document.getElementById(currentChatroom).classList.add("current");
        }
    }, [currentChatroom]);

    return (
        <div id={id} className="single-chatroom" onClick={handleClick}>
            <p className="chatroom-name">{name}</p>
            <p className="chatroom-description">{description}</p>
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

export default connect(null, mapDispatchToProps)(SingleChatroom);
