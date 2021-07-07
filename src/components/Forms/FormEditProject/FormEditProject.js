import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/constants/DrawerCyberBugsConst";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/ProjectCategoryConst";
import { UPDATE_PROJECT_SAGA } from "../../../redux/constants/ProjectConst";

function FormEditProject(props) {
    const arrProjectCategory = useSelector(
        (state) => state.ProjectCategoryReducer.arrProjectCategory
    );
    const dispatch = useDispatch();
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue,
    } = props;

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     alert("Submit edit");
    // };

    // Component Did Mount
    useEffect(() => {
        // Call api to load project category
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        });

        // Load submit event to drawer
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmit,
        });
    }, []);

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content);
    };
    return (
        <form className="container-fluid" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project ID</p>
                        <input
                            value={values.id}
                            disabled
                            className="form-control"
                            name="id"
                        />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Name</p>
                        <input
                            className="form-control"
                            name="projectName"
                            onChange={handleChange}
                            value={values.projectName}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select
                            onChange={handleChange}
                            className="form-control"
                            value={values.categoryId}
                            name="categoryId"
                        >
                            {arrProjectCategory?.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.projectCategoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
                            name="Description"
                            value={values.description}
                            init={{
                                selector: "textarea#myTextArea",
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

const EditProjectForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        const { projectEdit } = props;
        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId,
        };
    },

    validationSchema: Yup.object().shape({}),

    handleSubmit: (values, { props, setSubmitting }) => {
        // Submit updated data to backend through api
        console.log(values);
        props.dispatch({
            type: UPDATE_PROJECT_SAGA,
            projectUpdate: values,
        });
    },

    displayName: "EditProjectFormik",
})(FormEditProject);

// Use this instead of useSelector because to use this in Formik function not component
const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
