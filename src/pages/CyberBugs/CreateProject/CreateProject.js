import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateProject() {
    const handleEditorChange = (content, editor) => {
        console.log("Content was updated:", content);
        console.log("Content was updated:", editor);
    };

    return (
        <div className="container m-5">
            <h3>Create Project</h3>
            <form className="container">
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
                    <select name="categoryId" className="form-control">
                        <option>Software</option>
                        <option>Web</option>
                        <option>App</option>
                    </select>
                </div>
                <button className="btn btn-outline-primary">
                    Create Project
                </button>
            </form>
        </div>
    );
}
