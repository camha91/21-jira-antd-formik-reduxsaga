import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <NavLink className="navbar-brand" to="/">
                    Cyberbugs
                </NavLink>
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/home"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/contact"
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/register"
                            >
                                SignUp
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/dragdrop"
                            >
                                DemoDragDrop
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/dragdropdnd"
                            >
                                DemoDragDropDnD
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                activeClassName="activeNavItem"
                                activeStyle={{ fontWeight: "bold" }}
                                className="nav-link"
                                to="/cyberbugs"
                            >
                                Cyber Bugs
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
