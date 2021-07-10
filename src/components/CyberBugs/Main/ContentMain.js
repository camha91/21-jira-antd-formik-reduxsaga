import React from "react";
import { useDispatch } from "react-redux";
import {
    GET_TASK_DETAIL_API,
    UPDATE_TASK_STATUS_API,
} from "../../../redux/constants/TaskConst";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ContentMain(props) {
    const { projectDetail } = props;
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        const { projectId, taskId } = JSON.parse(result.draggableId);

        console.log({ projectId, taskId });

        const { destination, source } = result;

        if (!result.destination) {
            return;
        }

        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        ) {
            return;
        }

        // Call api to update the task status
        dispatch({
            type: UPDATE_TASK_STATUS_API,
            taskStatusUpdate: {
                taskId: taskId,
                statusId: destination.droppableId,
                projectId: projectId,
            },
        });
    };

    const renderCardTaskList = () => {
        return (
            <DragDropContext onDragEnd={handleDragEnd}>
                {projectDetail.lstTask?.map((card, index) => {
                    return (
                        <Droppable key={index} droppableId={card.statusId}>
                            {(provided) => {
                                return (
                                    <div
                                        key={index}
                                        className="card pb-2"
                                        style={{
                                            width: "17rem",
                                            height: "auto",
                                        }}
                                    >
                                        <div className="card-header">
                                            {card.statusName}
                                        </div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            key={index}
                                            className="list-group list-group-flush"
                                            style={{ height: "100%" }}
                                        >
                                            {card.lstTaskDeTail.map(
                                                (task, index) => {
                                                    return (
                                                        <Draggable
                                                            key={task.taskId.toString()}
                                                            index={index}
                                                            draggableId={JSON.stringify(
                                                                {
                                                                    projectId:
                                                                        task.projectId,
                                                                    taskId: task.taskId,
                                                                }
                                                            )}
                                                        >
                                                            {(provided) => {
                                                                return (
                                                                    <div
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="list-group-item"
                                                                        data-toggle="modal"
                                                                        data-target="#infoModal"
                                                                        onClick={() => {
                                                                            dispatch(
                                                                                {
                                                                                    type: GET_TASK_DETAIL_API,
                                                                                    taskId: task.taskId,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        <p className="font-weight-300">
                                                                            {
                                                                                task.taskName
                                                                            }
                                                                        </p>
                                                                        <div
                                                                            className="block"
                                                                            style={{
                                                                                display:
                                                                                    "flex",
                                                                            }}
                                                                        >
                                                                            <div className="block-left">
                                                                                <p className="text-danger">
                                                                                    {
                                                                                        task
                                                                                            .priorityTask
                                                                                            .priority
                                                                                    }
                                                                                </p>
                                                                                {/* <i className="fa fa-bookmark" />
                                                                <i className="fa fa-arrow-up" /> */}
                                                                            </div>
                                                                            <div className="block-right">
                                                                                <div
                                                                                    className="avatar-group"
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",
                                                                                    }}
                                                                                >
                                                                                    {task.assigness.map(
                                                                                        (
                                                                                            member,
                                                                                            index
                                                                                        ) => {
                                                                                            return (
                                                                                                <div
                                                                                                    key={
                                                                                                        index
                                                                                                    }
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
                                                                    </div>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    );
                                                }
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                );
                            }}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        );
    };

    return (
        <div className="content" style={{ display: "flex" }}>
            {renderCardTaskList()}
        </div>
    );
}
