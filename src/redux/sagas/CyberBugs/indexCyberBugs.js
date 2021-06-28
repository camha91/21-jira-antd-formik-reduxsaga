import React from "react";
import { Redirect } from "react-router";
import ContentMain from "../../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../../components/CyberBugs/Main/InfoMain";
import { USER_LOGIN } from "../../../utils/constants/settingSystem";

export default function indexCyberBugs() {
    if (localStorage.getItem(USER_LOGIN)) {
        return (
            <div className="main">
                <HeaderMain />
                <InfoMain />
                <ContentMain />
            </div>
        );
    } else {
        alert("Please login to access Cyber Board!");
        return <Redirect to="/login" />;
    }
}
