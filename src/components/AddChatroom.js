const AddChatroom = () => {
    return (
        <div className="add-chatroom">
            <p>Add new chatroom:</p>
            <form>
                <input type="text" placeholder="Chatroom name" maxLength="40" />
                <input
                    type="text"
                    placeholder="Short description"
                    maxLength="60"
                />
                <button>Add</button>
            </form>
        </div>
    );
};

export default AddChatroom;
