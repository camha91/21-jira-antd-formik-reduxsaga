import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.jfif";

export default function Menu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={logo} alt="logo" />
                </div>
                <div className="account-info">
                    <p>CyberLearn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fas fa-columns mr-1" />
                    <NavLink
                        to="/cyberbugs"
                        className="text-dark"
                        activeStyle={{ color: "pink" }}
                        activeClassName="active font-weight-bold"
                    >
                        Cyber Board
                    </NavLink>
                </div>
                <div>
                    <i className="fas fa-folder-plus mr-1" />
                    <NavLink
                        to="/createProject"
                        className="text-dark"
                        activeStyle={{ color: "pink" }}
                        activeClassName="active font-weight-bold"
                    >
                        Create Project
                    </NavLink>
                </div>
                <div>
                    <i className="fa fa-cog mr-1" />
                    <NavLink
                        to="/projectManagement"
                        className="text-dark"
                        activeStyle={{ color: "pink" }}
                        activeClassName="active font-weight-bold"
                    >
                        Project Management
                    </NavLink>
                </div>
                <div>
                    <i className="fas fa-users mr-1" />
                    <NavLink
                        to="/userManagement"
                        className="text-dark"
                        activeStyle={{ color: "pink" }}
                        activeClassName="active font-weight-bold"
                    >
                        User Management
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck mr-1" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals mr-1" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste mr-1" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow mr-1" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box mr-1" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    );
}
