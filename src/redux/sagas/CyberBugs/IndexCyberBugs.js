import React, { useEffect } from "react";
import { Redirect } from "react-router";
import ContentMain from "../../../components/CyberBugs/Main/ContentMain";
import HeaderMain from "../../../components/CyberBugs/Main/HeaderMain";
import InfoMain from "../../../components/CyberBugs/Main/InfoMain";
import { USER_LOGIN } from "../../../utils/constants/settingSystem";
import { useSelector, useDispatch } from "react-redux";

export default function IndexCyberBugs(props) {
    const { projectDetail } = useSelector((state) => state.ProjectReducer);
    const dispatch = useDispatch();

    console.log("projectDetail", projectDetail);

    useEffect(() => {
        // When user uses link to this page using NavLink or user type in url then
        // we use params from url to call saga action
        const { projectId } = props.match.params;
        dispatch({
            type: "GET_PROJECT_DETAIL_API",
            projectId,
        });
    }, []);

    if (!localStorage.getItem(USER_LOGIN)) {
        alert("Please login to access Cyber Board!");
        return <Redirect to="/login" />;
    } else {
        return (
            <div className="main">
                <HeaderMain projectDetail={projectDetail} />
                <InfoMain projectDetail={projectDetail} />
                <ContentMain projectDetail={projectDetail} />
            </div>
        );
    }
}
