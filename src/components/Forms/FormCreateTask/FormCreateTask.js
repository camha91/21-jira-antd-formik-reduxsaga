import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../redux/constants/DrawerCyberBugsConst";
import { GET_ALL_PRIORITY_API } from "../../../redux/constants/PriorityConst";
import { GET_PROJECT_DROPDOWN_API } from "../../../redux/constants/ProjectCyberBugsConst";
import { GET_ALL_STATUS_API } from "../../../redux/constants/StatusConst";
import { CREATE_TASK_API } from "../../../redux/constants/TaskConst";
import { GET_ALL_TASK_TYPE_API } from "../../../redux/constants/TaskTypeConst";
import {
    GET_USER_API,
    GET_USER_PROJECT_BY_ID_API,
} from "../../../redux/constants/UserCyberBugsConst";

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

    const { arrUser } = useSelector((state) => state.UserCyberBugsReducer);
    // function to change options for assignees select
    const userOptions = arrUser.map((user, index) => {
        return { value: user.userId, label: user.name };
    });

    useEffect(() => {
        dispatch({ type: GET_PROJECT_DROPDOWN_API });
        dispatch({ type: GET_ALL_PRIORITY_API });
        dispatch({ type: GET_ALL_TASK_TYPE_API });
        dispatch({ type: GET_USER_API, keyword: "" });
        dispatch({ type: GET_ALL_STATUS_API });
        // Put handle submit function to drawer reducer to submit
        dispatch({
            type: SET_SUBMIT_EDIT_PROJECT,
            submitFunction: handleSubmit,
        });
    }, []);

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
                    onChange={(e) => {
                        // Dispatch value to change arrUser
                        const { value } = e.target;
                        dispatch({
                            type: GET_USER_PROJECT_BY_ID_API,
                            idProject: value,
                        });

                        // Update projectId value
                        setFieldValue("projectId", e.target.value);
                    }}
                >
                    {props.arrProject.map((project, index) => {
                        return (
                            <option key={index} value={project.id}>
                                {project.projectName}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input
                    name="taskName"
                    className="form-control"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select
                    name="statusId"
                    className="form-control"
                    onChange={handleChange}
                >
                    {props.arrStatus.map((status, index) => {
                        return (
                            <option key={index} value={status.statusId}>
                                {status.statusName}
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
                            {props.arrPriority.map((priority, index) => {
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
                            {props.arrTaskType.map((taskType, index) => {
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
                    <div className="col-12">
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracting.timeTrackingSpent}
                            max={
                                Number(timeTracting.timeTrackingSpent) +
                                Number(timeTracting.timeTrackingRemaining)
                            }
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-left">
                        {timeTracting.timeTrackingSpent}h logged
                    </div>
                    <div className="col-6 text-right">
                        {timeTracting.timeTrackingRemaining}h logged
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-4">
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

                    <div className="col-4">
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
                    <div className="col-4">
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
                                    timeTrackingRemaining: e.target.value,
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
        </form>
    );
}

const CreateTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrPriority, arrStatus, arrTaskType } = props;
        return {
            taskName: "",
            description: "",
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: [],
        };
    },

    validationSchema: Yup.object().shape({}),

    handleSubmit: (values, { props, setSubmitting }) => {
        // Submit updated data to backend through api
        props.dispatch({
            type: CREATE_TASK_API,
            taskObject: values,
        });

        console.log("createTask value", values);
    },

    displayName: "CreateTaskFormik",
})(FormCreateTask);

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberBugsReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    };
};

export default connect(mapStateToProps)(CreateTaskForm);
