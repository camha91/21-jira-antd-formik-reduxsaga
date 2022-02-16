import {
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { signupCyberBugsAction } from "../../redux/actions/UserCyberBugsAction";

const { Title } = Typography;

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function SignUp(props) {
    const { errors, handleChange, handleSubmit } = props;

    return (
        <Form
            onFinish={handleSubmit}
            className="container"
            style={{ height: window.innerHeight }}
            // initialValues={{ remember: true }}
        >
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: window.innerHeight }}
            >
                <Title
                    level={3}
                    className="text-center"
                    style={{ fontWeight: 300, fontSize: 35 }}
                >
                    Sign up
                </Title>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Please input your Email!" },
                    ]}
                >
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        size="large"
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        placeholder="Email"
                    />
                </Form.Item>
                <div className="text-danger">{errors.email}</div>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        size="large"
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <div className="text-danger">{errors.password}</div>
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Phone Number!",
                        },
                    ]}
                >
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        size="large"
                        prefix={
                            <PhoneOutlined className="site-form-item-icon" />
                        }
                        type="number"
                        placeholder="Phone Number"
                    />
                </Form.Item>
                <div className="text-danger">{errors.phoneNumber}</div>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        onChange={handleChange}
                        style={{ width: "100%", minWidth: 300 }}
                        size="large"
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        type="name"
                        placeholder="Name"
                    />
                </Form.Item>
                <div className="text-danger">{errors.name}</div>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        size="large"
                        style={{
                            minWidth: 300,
                            backgroundColor: "rgb(102,117,223)",
                            color: "#fff",
                        }}
                        className="mt-3"
                    >
                        Sign Up
                    </Button>

                    <div
                        className="mt-3"
                        style={{ textDecoration: "underline" }}
                    >
                        <a href="/login"> Or Login now!</a>
                    </div>
                </Form.Item>
            </div>
        </Form>
    );
}

const SignUpWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: "",
        password: "",
        phoneNumber: "",
        name: "",
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required("Email is required!")
            .email("Email is invalid!"),
        password: Yup.string()
            .min(6, "Password must have min 6 characters!")
            .max(32, "Password have max 32 characters!"),
        phoneNumber: Yup.string().matches(
            phoneRegExp,
            "Phone number is not valid"
        ),
        name: Yup.string()
            .min(6, "Name must have min 6 characters!")
            .max(32, "Name have max 32 characters!"),
    }),

    handleSubmit: (
        { email, password, phoneNumber, name },
        { props, setSubmitting }
    ) => {
        setSubmitting(true);

        props.dispatch(
            signupCyberBugsAction(email, password, phoneNumber, name)
        );
    },

    displayName: "Signup CyberBugs",
})(SignUp);

export default connect()(SignUpWithFormik);
