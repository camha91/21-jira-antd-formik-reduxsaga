import React from "react";
import { Route } from "react-router";
import Menu from "../../components/CyberBugs/Menu";
import ModalCyberBugs from "../../components/CyberBugs/ModalCyberBugs/ModalCyberBugs";
import SideBar from "../../components/CyberBugs/SideBar";
import "../../index.css";

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
                            <Component {...propsRoute} />
                            <ModalCyberBugs />
                        </div>
                    </>
                );
            }}
        />
    );
};
