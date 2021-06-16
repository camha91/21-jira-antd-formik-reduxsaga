import {
    FacebookOutlined,
    LockOutlined,
    TwitterOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { signinCyberBugsAction } from "../../../redux/actions/CyberBugsAction";

function LoginCyberBugs(props) {
    const { errors, handleChange, handleSubmit } = props;

    return (
        <form
            onSubmit={handleSubmit}
            className="container"
            style={{ height: window.innerHeight }}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: window.innerHeight }}
            >
                <h3
                    className="text-center"
                    style={{ fontWeight: 300, fontSize: 35 }}
                >
                    Login CyberBugs
                </h3>

                <div className="d-flex mt-3">
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        name="email"
                        size="large"
                        placeholder="large size"
                        prefix={<UserOutlined />}
                    />
                </div>
                <div className="text-danger">{errors.email}</div>
                <div className="d-flex mt-3">
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        name="password"
                        size="large"
                        placeholder="large size"
                        prefix={<LockOutlined />}
                    />
                </div>
                <div className="text-danger">{errors.password}</div>
                <Button
                    htmlType="submit"
                    size="large"
                    style={{
                        minWidth: 300,
                        backgroundColor: "rgb(102,117,223)",
                        color: "#fff",
                    }}
                    className="mt-5"
                >
                    Login
                </Button>

                <div className="social mt-3 d-flex">
                    <Button
                        style={{ backgroundColor: "rgb(59,89,152)" }}
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<FacebookOutlined />}
                    ></Button>

                    <Button
                        type="primary ml-3"
                        shape="circle"
                        size="large"
                        icon={<TwitterOutlined />}
                    ></Button>
                </div>
            </div>
        </form>
    );
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({ email: "", password: "" }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required("Email is required!")
            .email("Email is invalid!"),
        password: Yup.string()
            .min(6, "Password must have min 6 characters!")
            .max(32, "Password have max 32 characters!"),
    }),

    handleSubmit: ({ email, password }, { props, setSubmitting }) => {
        setSubmitting(true);
        props.dispatch(signinCyberBugsAction(email, password));
    },

    displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
