import React from "react";
import avatar1 from "../../../assets/img/avatar1.jfif";
import avatar2 from "../../../assets/img/avatar2.jfif";

export default function ContentMain(props) {
    const { projectDetail } = props;

    const renderCardTaskList = () => {
        return projectDetail.lstTask?.map((card, index) => {
            return (
                <div
                    key={index}
                    className="card pb-2"
                    style={{ width: "17rem", height: "25rem" }}
                >
                    <div className="card-header">{card.statusName}</div>
                    <ul className="list-group list-group-flush">
                        {card.lstTaskDetail.map((task, index) => {
                            return (
                                <li
                                    key={index}
                                    className="list-group-item"
                                    data-toggle="modal"
                                    data-target="#infoModal"
                                    style={{ cursor: "pointer" }}
                                >
                                    <p>{task.taskName}</p>
                                    <div
                                        className="block"
                                        style={{ display: "flex" }}
                                    >
                                        <div className="block-left">
                                            <p className="text-danger">
                                                {task.priorityTask.priority}
                                            </p>
                                            {/* <i className="fa fa-bookmark" />
                                            <i className="fa fa-arrow-up" /> */}
                                        </div>
                                        <div className="block-right">
                                            <div
                                                className="avatar-group"
                                                style={{ display: "flex" }}
                                            >
                                                {task.assigness.map(
                                                    (member, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="avatar"
                                                            >
                                                                <img
                                                                    src={
                                                                        member.avatar
                                                                    }
                                                                    alt={
                                                                        member.avatar
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}

                        <li className="list-group-item">
                            <p>
                                Each issue has a single reporter but can have
                                multiple assignees
                            </p>
                            <div className="block" style={{ display: "flex" }}>
                                <div className="block-left">
                                    <i className="fa fa-check-square" />
                                    <i className="fa fa-arrow-up" />
                                </div>
                                <div className="block-right">
                                    <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                    >
                                        <div className="avatar">
                                            <img src={avatar1} alt="1" />
                                        </div>
                                        <div className="avatar">
                                            <img src={avatar2} alt="2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="content" style={{ display: "flex" }}>
            {renderCardTaskList()}
        </div>
    );
}
