import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Welcome from "./views/Welcome";
import Chatroom from "./views/Chatroom";
import NotFound from "./views/NotFound";
import { projectAuth } from "./firebase/config";
import { useState, useEffect } from "react";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(projectAuth.currentUser);
    });

    const updateUser = () => {
        if (projectAuth.currentUser) {
            setUser({
                ...projectAuth.currentUser,
                displayName: projectAuth.currentUser.displayName,
            });
        }
    };

    return (
        <Router>
            <div className="App"></div>
            <Switch>
                <Route exact path="/">
                    {!user ? (
                        <Welcome updateUser={updateUser} />
                    ) : (
                        <Redirect to={"/chatroom"} />
                    )}
                </Route>
                <Route path="/chatroom">
                    {user ? <Chatroom user={user} /> : <Redirect to="/" />}
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
