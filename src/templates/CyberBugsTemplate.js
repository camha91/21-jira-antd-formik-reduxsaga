import React from "react";
import { Route } from "react-router";
import ContentMain from "../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../components/CyberBugs/Main/InfoMain";
import Menu from "../components/CyberBugs/Menu";
import SideBar from "../components/CyberBugs/SideBar";
import "../index.css";

export const CyberBugsTemplate = (props) => {
    const { Component, ...restParam } = props;

    return (
        <Route
            path={restParam.path}
            render={(propsRoute) => {
                return (
                    <>
                        <div className="jira">
                            <SideBar />
                            <Menu />
                            <div className="main">
                                <h3>Cyber Board</h3>
                                <HeaderMain />
                                <ContentMain />
                                <InfoMain />
                            </div>
                        </div>
                    </>
                );
            }}
        />
    );
};
