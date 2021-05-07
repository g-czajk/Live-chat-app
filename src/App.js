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
import { useEffect } from "react";
import { connect } from "react-redux";
import { trackUser } from "./actions/appActions";

function App(props) {
    useEffect(() => {
        projectAuth.onAuthStateChanged((user) => {
            if (user && !props.user) {
                props.trackUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
            } else {
                props.trackUser({ uid: null, email: null, displayName: null });
            }
        });
    }, []);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        {!props.user ? (
                            <Welcome />
                        ) : (
                            <Redirect to={"/chatroom"} />
                        )}
                    </Route>
                    <Route path="/chatroom">
                        {props.user ? <Chatroom /> : <Redirect to="/" />}
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackUser: ({ uid, email, displayName }) => {
            dispatch(trackUser({ uid, email, displayName }));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
