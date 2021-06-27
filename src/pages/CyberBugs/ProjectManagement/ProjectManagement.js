import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import ReactHtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const data = [
    {
        id: 644,
        projectName: "Test",
        description: "<p>Test1</p>",
        categoryId: 1,
        categoryName: "Dự án web",
        alias: "test",
        deleted: false,
    },
    {
        id: 645,
        projectName: "NodeJs Cyber",
        description: "<p>NodeJS cyber</p>",
        categoryId: 2,
        categoryName: "Dự án phần mềm",
        alias: "nodejs-cyber",
        deleted: false,
    },
    {
        id: 647,
        projectName: "gfdsgdf",
        description: "<p>gfdsg</p>",
        categoryId: 1,
        categoryName: "Dự án web",
        alias: "gfdsgdf",
        deleted: false,
    },
    {
        id: 648,
        projectName: "fdgas",
        description: "<p>dfgs</p>",
        categoryId: 2,
        categoryName: "Dự án phần mềm",
        alias: "fdgas",
        deleted: false,
    },
    {
        id: 649,
        projectName: "project 123",
        description: "<p>fasdfasdf</p>",
        categoryId: 1,
        categoryName: "Dự án web",
        alias: "project-123",
        deleted: false,
    },
    {
        id: 650,
        projectName: "project 678",
        description: "<p>flsdj</p>",
        categoryId: 1,
        categoryName: "Dự án web",
        alias: "project-678",
        deleted: false,
    },
];

export default function ProjectManagement() {
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });

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
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text, record, index) => {
                const jsxContent = ReactHtmlParser(text);
                return <div key={index}>{jsxContent}</div>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <a>
                        <EditOutlined />
                    </a>
                    <a>
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
                dataSource={data}
                onChange={handleChange}
            />
        </div>
    );
}
