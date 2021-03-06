import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DrawerCyberBugs from "./HOC/Modal/DrawerCyberBugs";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import UserManagement from "./pages/CyberBugs/UserManagement/UserManagement";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import SignUp from "./pages/SignUp/SignUp";
import { CyberBugsTemplate } from "./templates/CyberBugsTemplate/CyberBugsTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { LoginTemplate } from "./templates/LoginTemplate/LoginTemplate";
import { SignUpTemplate } from "./templates/SignUpTemplate/SignUpTemplate";
import "./App.css";

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
            <DrawerCyberBugs />
            <Switch>
                <HomeTemplate exact path="/home" Component={Home} />
                <HomeTemplate exact path="/about" Component={About} />
                <HomeTemplate exact path="/contact" Component={Contact} />
                <LoginTemplate exact path="/login" Component={LoginCyberBugs} />
                <SignUpTemplate exact path="/register" Component={SignUp} />
                <HomeTemplate exact path="/dragdrop" Component={DemoDragDrop} />
                <HomeTemplate
                    exact
                    path="/dragdropdnd"
                    Component={DragAndDropDnD}
                />
                <CyberBugsTemplate
                    exact
                    path="/cyberbugs"
                    Component={ProjectDetail}
                />
                <CyberBugsTemplate
                    exact
                    path="/createProject"
                    Component={CreateProject}
                />
                <CyberBugsTemplate
                    exact
                    path="/projectManagement"
                    Component={ProjectManagement}
                />
                <CyberBugsTemplate
                    exact
                    path="/projectDetail/:projectId"
                    Component={ProjectDetail}
                />
                <CyberBugsTemplate
                    exact
                    path="/userManagement"
                    Component={UserManagement}
                />
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate path="*" Component={PageNotFound} />
            </Switch>
        </>
    );
}

export default App;
