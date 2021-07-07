import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRIORITY_API } from "../../../redux/constants/PriorityConst";
import { GET_PROJECT_DROPDOWN_API } from "../../../redux/constants/ProjectCyberBugsConst";
import { GET_ALL_TASK_TYPE_API } from "../../../redux/constants/TaskTypeConst";
import { GET_USER_API } from "../../../redux/constants/UserCyberBugsConst";
import * as Yup from "yup";

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
}

function FormCreateTask(props) {
    const dispatch = useDispatch();

    const [timeTracting, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    });

    const { arrProject } = useSelector(
        (state) => state.ProjectCyberBugsReducer
    );

    const { arrPriority } = useSelector((state) => state.PriorityReducer);

    const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);

    const { userSearch } = useSelector((state) => state.UserCyberBugsReducer);

    // function to change options for assignees select
    const userOptions = userSearch.map((user, index) => {
        return { value: user.userId, label: user.name };
    });

    useEffect(() => {
        dispatch({ type: GET_PROJECT_DROPDOWN_API });
        dispatch({ type: GET_ALL_PRIORITY_API });
        dispatch({ type: GET_ALL_TASK_TYPE_API });
        dispatch({ type: GET_USER_API, keyword: "" });
    }, []);

    const handleEditorChange = () => {};

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

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select
                    name="projectId"
                    className="form-control"
                    onChange={handleChange}
                >
                    {arrProject.map((project, index) => {
                        return (
                            <option key={index} value={project.id}>
                                {project.projectName}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select
                            className="form-control"
                            name="priorityId"
                            onChange={handleChange}
                        >
                            {arrPriority.map((priority, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={priority.priorityId}
                                    >
                                        {priority.priority}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select
                            className="form-control"
                            name="typeId"
                            onChange={handleChange}
                        >
                            {arrTaskType.map((taskType, index) => {
                                return (
                                    <option key={index} value={taskType.id}>
                                        {taskType.taskType}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-12">
                        <p>Assingnees</p>
                        <Select
                            mode="multiple"
                            allowClear
                            options={userOptions}
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onSelect={(value) => {
                                console.log(value);
                            }}
                            onChange={(values) => {
                                setFieldValue("listUserAsign", values);
                            }}
                        >
                            {children}
                        </Select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Reporter</p>
                        <Select
                            mode="multiple"
                            allowClear
                            options={userOptions}
                            style={{ width: "100%" }}
                            placeholder="Please select"
                            optionFilterProp="label"
                            onSelect={(value) => {
                                console.log(value);
                            }}
                            onChange={(values) => {
                                setFieldValue("listUserAsign", values);
                            }}
                        >
                            {children}
                        </Select>

                        <div className="row mt-3">
                            <div className="col-12">
                                <p className="mt-1">Original Estimate</p>
                                <input
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    name="originalEstimate"
                                    defaultValue="0"
                                    height="30"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracting.timeTrackingSpent}
                            max={
                                Number(timeTracting.timeTrackingSpent) +
                                Number(timeTracting.timeTrackingRemaining)
                            }
                        />
                        <div className="row">
                            <div className="col-6 text-left">
                                {timeTracting.timeTrackingSpent}h logged
                            </div>
                            <div className="col-6 text-right">
                                {timeTracting.timeTrackingRemaining}h logged
                            </div>
                        </div>

                        <div className="row mt-2" style={{ marginTop: 5 }}>
                            <div className="col-6">
                                <p>Time Spent</p>
                                <input
                                    type="number"
                                    defaultValue="0"
                                    min="0"
                                    className="form-control"
                                    name="timeTrackingSpent"
                                    onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracting,
                                            timeTrackingSpent: e.target.value,
                                        });
                                        setFieldValue(
                                            "timeTrackingSpent",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <p>Time Remaining</p>
                                <input
                                    type="number"
                                    defaultValue="0"
                                    min="0"
                                    className="form-control"
                                    name="timeTrackingRemaining"
                                    onChange={(e) => {
                                        setTimeTracking({
                                            ...timeTracting,
                                            timeTrackingRemaining:
                                                e.target.value,
                                        });
                                        setFieldValue(
                                            "timeTrackingRemaining",
                                            e.target.value
                                        );
                                    }}
                                />
                            </div>
                        </div>
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
                    onEditorChange={(content, editor) => {
                        setFieldValue("description", content);
                    }}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

const CreateTaskForm = withFormik({
    mapPropsToValues: (props) => {
        return {
            taskName: "",
            description: "",
            statusId: "",
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0,
            listUserAsign: [],
        };
    },

    validationSchema: Yup.object().shape({}),

    handleSubmit: (values, { props, setSubmitting }) => {
        // Submit updated data to backend through api
        props.dispatch({});
    },

    displayName: "CreateTaskFormik",
})(FormCreateTask);

// Use this instead of useSelector because to use this in Formik function not component
const mapStateToProps = (state) => ({
    projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(CreateTaskForm);
