import React, { useEffect } from "react";
import avatar1 from "../../../assets/img/avatar1.jfif";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_API } from "../../../redux/constants/StatusConst";
import { GET_ALL_PRIORITY_API } from "../../../redux/constants/PriorityConst";
import {
    UPDATE_TASK_STATUS_API,
    CHANGE_TASK_MODAL,
} from "../../../redux/constants/TaskConst";
import { GET_ALL_TASK_TYPE_API } from "../../../redux/constants/TaskTypeConst";

export default function ModalCyberBugs(props) {
    const { taskDetailModal } = useSelector((state) => state.TaskReducer);
    const { arrStatus } = useSelector((state) => state.StatusReducer);
    const { arrPriority } = useSelector((state) => state.PriorityReducer);
    const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
    const dispatch = useDispatch();

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return jsxDescription;
    };

    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

        return (
            <div>
                <div style={{ display: "flex" }}>
                    <i className="fa fa-clock" />
                    <div style={{ width: "100%" }}>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${percent}%` }}
                                aria-valuenow={Number(timeTrackingSpent)}
                                aria-valuemin={Number(timeTrackingRemaining)}
                                aria-valuemax={max}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p className="logged">
                                {Number(timeTrackingSpent)}h logged
                            </p>
                            <p className="estimate-time">
                                {Number(timeTrackingRemaining)}h estimated
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <input
                            className="form-control"
                            name="timeTrackingSpent"
                            onChange={handleUpdateTask}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            className="form-control"
                            name="timeTrackingRemaining"
                            onChange={handleUpdateTask}
                        />
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_API });
        dispatch({ type: GET_ALL_PRIORITY_API });
        dispatch({ type: GET_ALL_TASK_TYPE_API });
    }, []);

    const handleUpdateTask = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: CHANGE_TASK_MODAL,
            name,
            value,
        });
    };

    return (
        <div
            className="modal fade"
            id="infoModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="infoModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark" />
                            <select
                                name="typeId"
                                value={taskDetailModal.typeId}
                                onChange={handleUpdateTask}
                            >
                                {arrTaskType.map((taskType, index) => {
                                    return (
                                        <option key={index} value={taskType.id}>
                                            {taskType.taskType}
                                        </option>
                                    );
                                })}
                            </select>
                            <span>{taskDetailModal.taskName}</span>
                        </div>
                        <div style={{ display: "flex" }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span style={{ paddingRight: 20 }}>
                                    Give feedback
                                </span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span style={{ paddingRight: 20 }}>
                                    Copy link
                                </span>
                            </div>
                            <i
                                className="fa fa-trash-alt='xyz'"
                                style={{ cursor: "pointer" }}
                            />
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">
                                        This is an issue of type: Task.
                                    </p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div
                                            className="block-comment"
                                            style={{ display: "flex" }}
                                        >
                                            <div className="avatar">
                                                <img
                                                    src={avatar1}
                                                    alt="avatar1"
                                                />
                                            </div>
                                            <div className="input-comment">
                                                <input
                                                    type="text"
                                                    placeholder="Add a comment ..."
                                                />
                                                <p>
                                                    <span
                                                        style={{
                                                            fontWeight: 500,
                                                            color: "gray",
                                                        }}
                                                    >
                                                        Protip:
                                                    </span>
                                                    <span>
                                                        press
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                                background:
                                                                    "#ecedf0",
                                                                color: "#b4bac6",
                                                            }}
                                                        >
                                                            M
                                                        </span>
                                                        to comment
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="lastest-comment">
                                            <div className="comment-item">
                                                <div
                                                    className="display-comment"
                                                    style={{ display: "flex" }}
                                                >
                                                    <div className="avatar">
                                                        <img
                                                            src={avatar1}
                                                            alt="avatar1"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p
                                                            style={{
                                                                marginBottom: 5,
                                                            }}
                                                        >
                                                            Lord Gaben{" "}
                                                            <span>
                                                                a month ago
                                                            </span>
                                                        </p>
                                                        <p
                                                            style={{
                                                                marginBottom: 5,
                                                            }}
                                                        >
                                                            Lorem ipsum dolor
                                                            sit amet,
                                                            consectetur
                                                            adipisicing elit.
                                                            Repellendus tempora
                                                            ex voluptatum saepe
                                                            ab officiis alias
                                                            totam ad accusamus
                                                            molestiae?
                                                        </p>
                                                        <div>
                                                            <span
                                                                style={{
                                                                    color: "#929398",
                                                                }}
                                                            >
                                                                Edit
                                                            </span>
                                                            •
                                                            <span
                                                                style={{
                                                                    color: "#929398",
                                                                }}
                                                            >
                                                                Delete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select
                                            name="statusId"
                                            className="custom-select"
                                            value={taskDetailModal.statusId}
                                            onChange={(e) => {
                                                handleUpdateTask(e);
                                                // const action = {
                                                //     type: UPDATE_TASK_STATUS_API,
                                                //     taskStatusUpdate: {
                                                //         taskId: taskDetailModal.taskId,
                                                //         statusId:
                                                //             e.target.value,
                                                //         projectId:
                                                //             taskDetailModal.projectId,
                                                //     },
                                                // };

                                                // // // console.log('action',action);
                                                // console.log(
                                                //     "taskupdatestatus",
                                                //     {
                                                //         taskId: taskDetailModal.taskId,
                                                //         statusId:
                                                //             e.target.value,
                                                //     }
                                                // );

                                                // dispatch(action);
                                            }}
                                        >
                                            {arrStatus.map((status, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={status.statusId}
                                                    >
                                                        {status.statusName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div style={{ display: "flex" }}>
                                            {taskDetailModal.assigness.map(
                                                (member, index) => {
                                                    return (
                                                        <div
                                                            key={index}
                                                            style={{
                                                                display: "flex",
                                                            }}
                                                            className="item"
                                                        >
                                                            <div className="avatar">
                                                                <img
                                                                    src={
                                                                        member.avatar
                                                                    }
                                                                    alt={
                                                                        member.avatar
                                                                    }
                                                                />
                                                            </div>
                                                            <p className="name">
                                                                {member.name}
                                                                <i
                                                                    className="fa fa-times"
                                                                    style={{
                                                                        marginLeft: 5,
                                                                    }}
                                                                />
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                            )}

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <i
                                                    className="fa fa-plus"
                                                    style={{ marginRight: 5 }}
                                                />
                                                <span>Add more</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div
                                            style={{ display: "flex" }}
                                            className="item"
                                        >
                                            <div className="avatar">
                                                <img
                                                    src={avatar1}
                                                    alt="avatar1"
                                                />
                                            </div>
                                            <p className="name">
                                                Pickle Rick
                                                <i
                                                    className="fa fa-times"
                                                    style={{ marginLeft: 5 }}
                                                />
                                            </p>
                                        </div>
                                    </div> */}
                                    <div
                                        className="priority"
                                        style={{ marginBottom: 20 }}
                                    >
                                        <h6>PRIORITY</h6>
                                        <select
                                            name="priorityId"
                                            className="form-control"
                                            value={taskDetailModal.priorityId}
                                            onChange={(e) => {
                                                handleUpdateTask(e);
                                            }}
                                        >
                                            {arrPriority.map(
                                                (priority, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={
                                                                priority.priorityId
                                                            }
                                                        >
                                                            {priority.priority}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input
                                            name="originalEstimate"
                                            type="text"
                                            className="estimate-hours"
                                            value={
                                                taskDetailModal.originalEstimate
                                            }
                                            onChange={(e) => {
                                                handleUpdateTask(e);
                                            }}
                                        />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {renderTimeTracking()}
                                    </div>
                                    <div style={{ color: "#929398" }}>
                                        Create at a month ago
                                    </div>
                                    <div style={{ color: "#929398" }}>
                                        Update at a few seconds ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
