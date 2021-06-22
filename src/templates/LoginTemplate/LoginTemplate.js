import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

const { Sider, Content } = Layout;

export const LoginTemplate = (props) => {
    let { Component, ...restRoute } = props;

    const [{ width, height }, setSize] = useState({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
    });

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight),
            });
        };
    }, []);

    return (
        <Route
            {...restRoute}
            render={(propsRoute) => {
                return (
                    <>
                        <Layout>
                            <Sider
                                width={width / 2}
                                style={{
                                    height: height,
                                    backgroundImage: `url(https://picsum.photos/${Math.round(
                                        width / 2
                                    )}/${height})`,
                                    backgroundSize: "100%",
                                }}
                            ></Sider>
                            <Content>
                                <Component {...propsRoute} />
                            </Content>
                        </Layout>
                    </>
                );
            }}
        />
    );
};
