import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    AutoComplete,
    Avatar,
    Button,
    Popconfirm,
    Popover,
    Space,
    Table,
    Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormEditProject from "../../../components/Forms/FormEditProject";
import {
    GET_ALL_PROJECT_SAGA,
    OPEN_FORM_EDIT_PROJECT,
} from "../../../redux/constants/CyberBugsConst";

export default function ProjectManagement() {
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    const [value, setValue] = useState("");

    const projectList = useSelector(
        (state) => state.ProjectCyberBugsReducer.projectList
    );

    const { userSearch } = useSelector((state) => state.UserCyberBugsReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
    }, []);

    const handleChange = (pagination, filters, sorter) => {
        console.log("Various parameters", pagination, filters, sorter);
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    const clearFilters = () => {
        setState({ filteredInfo: null });
    };

    const clearAll = () => {
        setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    const setAgeSort = () => {
        setState({
            sortedInfo: {
                order: "descend",
                columnKey: "age",
            },
        });
    };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ["descent"],
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
            sorter: (item2, item1) => {
                const projectName1 = item1.projectName?.trim().toLowerCase();
                const projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
            sortDirections: ["descent"],
        },
        // {
        //     title: "Description",
        //     dataIndex: "description",
        //     key: "description",
        //     render: (text, record, index) => {
        //         const jsxContent = ReactHtmlParser(text);
        //         return <div key={index}>{jsxContent}</div>;
        //     },
        // },
        {
            title: "Category",
            dataIndex: "categoryName",
            key: "categoryName",
            sorter: (item1, item2) => {
                const categoryName1 = item1.categoryName?.trim().toLowerCase();
                const categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
            sortDirections: ["descent"],
        },
        {
            title: "Creator",
            key: "creator",
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>;
            },
            sorter: (item1, item2) => {
                const creator1 = item1.creator?.name.trim().toLowerCase();
                const creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
            sortDirections: ["descent"],
        },
        {
            title: "Members",
            key: "members",
            render: (text, record, index) => {
                return (
                    <div>
                        {record.members?.slice(0, 3).map((member, index) => {
                            return (
                                <Popover
                                    key={index}
                                    placement="top"
                                    title={"members"}
                                    content={() => {
                                        return (
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {record.members?.map(
                                                        (member, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {
                                                                            member.userId
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            src={
                                                                                member.avatar
                                                                            }
                                                                            alt="avatar"
                                                                            width="30"
                                                                            height="30"
                                                                            style={{
                                                                                borderRadius:
                                                                                    "15px",
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            onClick={() => {
                                                                                dispatch(
                                                                                    {
                                                                                        type: "REMOVE_USER_PROJECT",
                                                                                        userProject:
                                                                                            {
                                                                                                projectId:
                                                                                                    record.id,
                                                                                                userId: member.userId,
                                                                                            },
                                                                                    }
                                                                                );
                                                                            }}
                                                                            className="btn btn-danger"
                                                                            style={{
                                                                                borderRadius:
                                                                                    "50%",
                                                                            }}
                                                                        >
                                                                            X
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        );
                                    }}
                                >
                                    <Avatar key={index} src={member.avatar} />;
                                </Popover>
                            );
                        })}

                        {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

                        <Popover
                            placement="rightTop"
                            title={"Add user"}
                            content={() => {
                                return (
                                    <AutoComplete
                                        options={userSearch?.map(
                                            (user, index) => {
                                                return {
                                                    label: user.name,
                                                    value: user.userId.toString(),
                                                };
                                            }
                                        )}
                                        value={value}
                                        onChange={(text) => {
                                            setValue(text);
                                        }}
                                        onSelect={(valueSelect, option) => {
                                            // Set member select = option.label
                                            setValue(option.label);

                                            // Call api to send data to backend
                                            dispatch({
                                                type: "ADD_USER_PROJECT_API",
                                                userProject: {
                                                    projectId: record.id,
                                                    userId: valueSelect,
                                                },
                                            });
                                        }}
                                        style={{ width: "100%" }}
                                        onSearch={(value) => {
                                            dispatch({
                                                type: "GET_USER_API",
                                                keyword: value,
                                            });
                                        }}
                                    />
                                );
                            }}
                            trigger="click"
                        >
                            <Button style={{ borderRadius: "50%" }}>+</Button>
                        </Popover>
                    </div>
                );
            },
        },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: (text, record) => (
                <Space size="middle">
                    <button
                        onClick={() => {
                            // dispatch to reducer drawer content
                            const action = {
                                type: OPEN_FORM_EDIT_PROJECT,
                                Component: <FormEditProject />,
                            };

                            dispatch(action);

                            // dispatch current line data to reducer
                            const actionEditProject = {
                                type: "EDIT_PROJECT",
                                projectEditModel: record,
                            };

                            dispatch(actionEditProject);
                        }}
                        className="btn btn-primary"
                    >
                        <EditOutlined />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({
                                type: "DELETE_PROJECT_SAGA",
                                idProject: record.id,
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined />
                        </button>
                    </Popconfirm>
                    ,
                </Space>
            ),
        },
    ];
    return (
        <div className="container-fluid mt-5">
            <h3>Project Management</h3>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space>
            <Table
                rowKey={"id"}
                columns={columns}
                dataSource={projectList}
                onChange={handleChange}
            />
        </div>
    );
}
