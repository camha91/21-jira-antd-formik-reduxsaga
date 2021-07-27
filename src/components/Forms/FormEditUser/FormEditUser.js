import { withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import {
    SET_SUBMIT_EDIT_USER,
    UPDATE_USER_SAGA,
} from "../../../redux/constants/UserCyberBugsConst";

function FormEditUser(props) {
    const dispatch = useDispatch();
    const { values, handleChange, handleSubmit } = props;

    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_EDIT_USER,
            submitFunction: handleSubmit,
        });
    }, []);

    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="col-12">
                <div className="row-4">
                    <div className="form-group">
                        <p className="font-weight-bold">User ID</p>
                        <input
                            value={values.id}
                            disabled
                            className="form-control"
                            name="id"
                        />
                    </div>
                </div>
                <div className="row-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Password</p>
                        <input
                            className="form-control"
                            name="passWord"
                            onChange={handleChange}
                            value={values.passWord}
                        />
                    </div>
                </div>
                <div className="row-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Email</p>
                        <input
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                        />
                    </div>
                </div>
                <div className="row-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Name</p>
                        <input
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                        />
                    </div>
                </div>
                <div className="row-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Phone Number</p>
                        <input
                            className="form-control"
                            name="phoneNumber"
                            onChange={handleChange}
                            value={values.phoneNumber}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

const EditUserForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { userEdit } = props;
        return {
            id: userEdit?.id,
            passWord: userEdit?.passWord,
            email: userEdit?.email,
            name: userEdit?.name,
            phoneNumber: userEdit?.phoneNumber,
        };
    },

    validationSchema: Yup.object().shape({}),

    handleSubmit: (values, { props, setSubmitting }) => {
        // Submit updated data to backend through api
        console.log(values);
        props.dispatch({
            type: UPDATE_USER_SAGA,
            userUpdate: values,
        });
    },

    displayName: "EditUserFormik",
})(FormEditUser);

// Use this instead of useSelector because to use this in Formik function not component
const mapStateToProps = (state) => ({
    userEdit: state.UserCyberBugsReducer.userEdit,
});

export default connect(mapStateToProps)(EditUserForm);
