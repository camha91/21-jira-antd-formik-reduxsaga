import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Select } from "antd";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
}

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

export default function FormCreateTask(props) {
    const handleEditorChange = () => {};
    return (
        <div className="container">
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control">
                    <option value="54">ProjectA</option>
                    <option value="55">ProjectB</option>
                </select>
            </div>
            <div className="form-group">
                <p>Task type</p>
                <input className="form-control" name="typeId" />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select className="form-control" name="priorityId">
                            <option>High</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId">
                            <option>New Task</option>
                            <option>Bugs</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            defaultValue={["a10", "c12"]}
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="Description"
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
    );
}
