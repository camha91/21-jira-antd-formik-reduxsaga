import React from "react";
import { BrowserRouter, NavLink, Switch } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Register from "./pages/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <NavLink exact to="/home" component={Home} />
                <NavLink exact to="/about" component={About} />
                <NavLink exact to="/contact" component={Contact} />
                <NavLink exact to="/login" component={Login} />
                <NavLink exact to="/register" component={Register} />
                <NavLink exact to="/" component={Home} />
                <NavLink to="*" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
