import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT } from "../../redux/constants/CyberBugsConst";

export default function FormEditProject() {
    const dispatch = useDispatch();

    const submitForm = (e) => {
        e.preventDefault();
        alert("Submit edit");
    };

    // Component Did Mount
    useEffect(() => {
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: submitForm,
        });
    }, []);

    const handleEditorChange = (content, editor) => {
        // setFieldValue("description", content);
    };
    return (
        <form className="container-fluid" onSubmit={submitForm}>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project ID</p>
                        <input disabled className="form-control" name="id" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Name</p>
                        <input
                            disabled
                            className="form-control"
                            name="projectName"
                        />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <input
                            disabled
                            className="form-control"
                            name="categoryName"
                        />
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor
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
                </div>
            </div>
        </form>
    );
}
