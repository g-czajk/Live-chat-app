const AddUser = () => {
    return (
        <div className="add-user">
            <form>
                <input type="text" placeholder="Add new user..." />
            </form>
            {/* {<div className="error">Username does not exist.</div>} */}
        </div>
    );
};

export default AddUser;
