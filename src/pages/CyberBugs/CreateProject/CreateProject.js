import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
    CREATE_PROJECT_SAGA,
    GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/constants/CyberBugsConst";

function CreateProject(props) {
    const arrProjectCategory = useSelector(
        (state) => state.ProjectCategoryReducer.arrProjectCategory
    );
    const { setFieldValue, handleChange, handleSubmit } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        // Call API to get data for select option
        dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
    }, []);

    const handleEditorChange = (content, editor) => {
        setFieldValue("description", content);
    };

    return (
        <div className="container m-5">
            <h3>Create Project</h3>
            <form
                className="container"
                onSubmit={handleSubmit}
                onChange={handleChange}
            >
                <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        apiKey="g27fj6m5418u3qhmks29fe5reido8j9q0a4nerxvir4xxnvu"
                        name="Description"
                        initialValue=""
                        init={{
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
                <div className="form-group">
                    <select
                        name="categoryId"
                        className="form-control"
                        onChange={handleChange}
                    >
                        {arrProjectCategory.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-primary">
                    Create Project
                </button>
            </form>
        </div>
    );
}

const CreateProjectForm = withFormik({
    enableReinitialize: true,

    mapPropsToValues: (props) => {
        console.log("propsValue", props);
        return {
            projectName: "",
            description: "",
            categoryId: props.arrProjectCategory[0]?.id,
        };
    },

    validationSchema: Yup.object().shape({}),

    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values,
        });
    },

    displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(CreateProjectForm);
