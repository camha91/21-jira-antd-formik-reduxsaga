import React, { useState, useRef } from "react";
import "./DemoDragDrop.css";
import { useSpring, animated } from "react-spring";

const defaultValue = [
    { id: 1, taskName: "Task 1" },
    { id: 2, taskName: "Task 2" },
    { id: 3, taskName: "Task 3" },
    { id: 4, taskName: "Task 4" },
    { id: 5, taskName: "Task 5" },
];

export default function DemoDragDrop() {
    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({});
    const tagDragEnter = useRef({});

    // Animation
    const [propsSpring, set, stop] = useSpring(() => ({
        from: { bottom: -25 },
        to: { bottom: 0 },
        config: { duration: 250 },
        reset: true,
    }));

    const handleDragOver = (e) => {
        // console.log("targetOver", e.target);
    };

    const handleDragStart = (e, task, index) => {
        // console.log("tag", e.target);
        // console.log("task", task);
        // console.log("index", index);
        // Save the value of the task that is dragging
        tagDrag.current = task;
    };

    const handleDragEnd = (e) => {
        // console.log("dragEnd", e.target);
    };

    const handleDrop = (e) => {
        // console.log("drop", e.target);
    };

    const handleDragEnter = (e, taskDragEnter, index) => {
        // console.log("dragEnterTag", e.target);
        // console.log("targertOver", taskDragEnter);
        // console.log("index", index);

        // Save the value of the task that is passed by
        set({ bottom: 0 });
        tagDragEnter.current = { ...taskDragEnter };

        const taskListUpdate = [...taskList];

        // Get index of the task that is dragging
        const indexDragTag = taskListUpdate.findIndex(
            (task) => task.id === tagDrag.current.id
        );

        // Get index of the replaced tag
        const indexDragEnter = taskListUpdate.findIndex(
            (task) => task.id === taskDragEnter.id
        );

        // Var that contain dragging task value
        const temp = taskListUpdate[indexDragTag];

        // Get the coordinate of the task that is dragging = the replaced task
        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];

        // Get the coordinate of the replaced task = the dragging task
        taskListUpdate[indexDragEnter] = temp;

        setTaskList(taskListUpdate);
    };

    return (
        <div
            className="container"
            onDragOver={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            onDrop={(e) => {
                tagDrag.current = {};
                // console.log("dragEnd");
                setTaskList([...taskList]);
            }}
        >
            <div className="text-center display-4">Task list</div>
            <div className="row">
                <div className="col-2"></div>
                <div className="bg-dark p-5 col-4">
                    {taskList.map((task, index) => {
                        const cssDragTag =
                            task.id === tagDrag.current.id ? "dragTag" : "";

                        if (task.id === tagDragEnter.current.id) {
                            return (
                                <animated.div
                                    style={{
                                        position: "relative",
                                        bottom: propsSpring.bottom.to(
                                            (numBottom) => `${numBottom}px`
                                        ),
                                    }}
                                    onDragStart={(e) => {
                                        handleDragStart(e, task, index);
                                    }}
                                    onDragEnter={(e) => {
                                        handleDragEnter(e, task, index);
                                    }}
                                    onDragEnd={(e) => {
                                        handleDragEnd(e);
                                    }}
                                    draggable="true"
                                    key={index}
                                    className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
                                >
                                    {task.taskName}
                                </animated.div>
                            );
                        }
                        return (
                            <div
                                onDragStart={(e) => {
                                    handleDragStart(e, task, index);
                                }}
                                onDragEnter={(e) =>
                                    handleDragEnter(e, task, index)
                                }
                                onDragEnd={(e) => {
                                    handleDragEnd(e);
                                }}
                                draggable="true"
                                key={index}
                                className="bg-success text-white m-1 p-3"
                            >
                                {task.taskName}
                            </div>
                        );
                    })}
                </div>
                <div
                    className="col-2 bg-primary"
                    style={{ height: 500 }}
                    onDragOver={(e) => {}}
                >
                    dsadsasda
                </div>
            </div>
        </div>
    );
}
