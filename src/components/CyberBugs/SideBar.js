import { BarsOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";

const { Sider } = Layout;

export default function SideBar() {
    const [state, setState] = useState({
        collapsed: false,
    });

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    const dispatch = useDispatch();

    return (
        <div>
            <Sider
                trigger={null}
                collapsible
                collapsed={state.collapsed}
                style={{ height: "100%" }}
            >
                <div className="text-right pr-2" onClick={toggle}>
                    <BarsOutlined
                        style={{
                            cursor: "pointer",
                            color: "#fff",
                            fontSize: 20,
                        }}
                    />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
                    <Menu.Item
                        key="1"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            dispatch({
                                type: "OPEN_FORM_CREATE_TASK",
                                Component: <FormCreateTask />,
                                title: "Create Task",
                            });
                        }}
                    >
                        Create Task
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SearchOutlined />}>
                        Search
                    </Menu.Item>
                </Menu>
            </Sider>
        </div>
    );
}
