import React from "react";

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
                        {card.lstTaskDeTail.map((task, index) => {
                            return (
                                <li
                                    key={index}
                                    className="list-group-item"
                                    data-toggle="modal"
                                    data-target="#infoModal"
                                    style={{ cursor: "pointer" }}
                                >
                                    <p className="font-weight-300">
                                        {task.taskName}
                                    </p>
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
