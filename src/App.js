import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { LoginTemplate } from "./templates/LoginTemplate/LoginTemplate";

function App() {
    return (
        <BrowserRouter>
            <LoadingComponent />
            <Switch>
                <HomeTemplate exact path="/home" Component={Home} />
                <HomeTemplate exact path="/about" Component={About} />
                <HomeTemplate exact path="/contact" Component={Contact} />
                <LoginTemplate exact path="/login" Component={LoginCyberBugs} />
                <HomeTemplate exact path="/register" Component={Register} />
                <HomeTemplate exact path="/" Component={Home} />
                <HomeTemplate path="*" Component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
