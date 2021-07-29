import { DownCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function CyberBugPageHeader() {
    const userLogin = useSelector(
        (state) => state.UserCyberBugsReducer.userLogin
    );
    return (
        <nav className="navbar navbar-light bg-light justify-content-between">
            <div>
                <NavLink className="avatar" to="/">
                    Dashboard
                </NavLink>
            </div>

            <form className="form-inline">
                <Text strong>Hello {userLogin?.name} !</Text>
                <Avatar src={userLogin.avatar} />
                <Button
                    style={{ backgroundColor: "rgb(59,89,152)" }}
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<DownCircleOutlined />}
                ></Button>
            </form>
        </nav>
    );
}
