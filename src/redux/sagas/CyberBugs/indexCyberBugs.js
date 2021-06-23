import React from "react";
import ContentMain from "../../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../../components/CyberBugs/Main/InfoMain";

export default function indexCyberBugs() {
    return (
        <div className="main">
            <HeaderMain />
            <InfoMain />
            <ContentMain />
        </div>
    );
}
