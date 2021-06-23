import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";
import indexCyberBugs from "./redux/sagas/CyberBugs/indexCyberBugs";
import { CyberBugsTemplate } from "./templates/CyberBugsTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { LoginTemplate } from "./templates/LoginTemplate/LoginTemplate";

function App() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "ADD_HISTORY",
            history,
        });
    }, []);

    return (
        <>
            <LoadingComponent />
            <Switch>
                <HomeTemplate exact path="/home" Component={Home} />
                <HomeTemplate exact path="/about" Component={About} />
                <HomeTemplate exact path="/contact" Component={Contact} />
                <LoginTemplate exact path="/login" Component={LoginCyberBugs} />
                <HomeTemplate exact path="/register" Component={Register} />
                <CyberBugsTemplate
                    exact
                    path="/cyberbugs"
                    Component={indexCyberBugs}
                />
                <CyberBugsTemplate
                    exact
                    path="/createproject"
                    Component={CreateProject}
                />
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate path="*" Component={PageNotFound} />
            </Switch>
        </>
    );
}

export default App;
