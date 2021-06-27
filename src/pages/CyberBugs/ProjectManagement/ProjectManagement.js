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
        },
        {
            title: "Project Name",
            dataIndex: "projectName",
            key: "projectName",
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
        },
        {
            title: "Creator",
            key: "creator",
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>;
            },
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
