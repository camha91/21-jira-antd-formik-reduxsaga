import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/CyberBugsConst";

export default function ProjectManagement() {
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

    const projectList = useSelector(
        (state) => state.ProjectCyberBugsReducer.projectList
    );

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
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a className="btn btn-primary">
                        <EditOutlined />
                    </a>
                    <a className="btn btn-danger">
                        <DeleteOutlined />
                    </a>
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