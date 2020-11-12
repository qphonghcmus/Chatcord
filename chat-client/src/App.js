import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={Login} />
                <Route exact path={"/chat"} component={Chat} />
            </Switch>
        </Router>
    );
}

export default App;
