import { Layout } from "antd";
import React from "react";
import { Route } from "react-router-dom";

const { Sider, Content } = Layout;

export const LoginTemplate = (props) => {
    let { Component, ...restRoute } = props;

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => {
                return (
                    <>
                        <Layout>
                            <Sider
                                width={window.innerWidth / 2}
                                style={{
                                    height: window.innerHeight,
                                    backgroundImage:
                                        "url(https://picsum.photos/2000)",
                                    backgroundSize: "100%",
                                }}
                            ></Sider>
                            <Content>
                                <Component />
                            </Content>
                        </Layout>
                    </>
                );
            }}
        />
    );
};
