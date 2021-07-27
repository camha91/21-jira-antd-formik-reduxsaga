import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input, Popconfirm, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FormEditUser from "../../../components/Forms/FormEditUser/FormEditUser";
import { EDIT_USER, GET_USER_API, OPEN_FORM_EDIT_USER } from "../../../redux/constants/UserCyberBugsConst";

export default function UserManagement() {
  const { userSearch } = useSelector(
    (state) => state.UserCyberBugsReducer
  );

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: GET_USER_API, keyword: ''})
  }, []);

  const columns = [
    {
      title: "User Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              // dispatch to reducer drawer content
                const action = {
                    type: OPEN_FORM_EDIT_USER,
                    Component: <FormEditUser />,
                    title: "Edit User",
                };
                dispatch(action);
                // dispatch current line data to reducer
                console.log('record1', record);
                const recordWithPW = {...record, passWord:''};
                const actionEditUser = {
                    type: EDIT_USER,
                    userEditModel: recordWithPW,
                };
                dispatch(actionEditUser);
            }}
            className="btn btn-primary"
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              // dispatch({
              //     type: DELETE_PROJECT_SAGA,
              //     idProject: record.id,
              // });
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

  const handleKeyDown = (e) => {
    // if (e.key === 'Enter') {
      dispatch({
        type: GET_USER_API,
        keyword: e.target.value
      });
    // }
  };
  
  return (
    <div className="container-fluid mt-5">
      <NavLink to="/register">Create User</NavLink>
      <Input className="mt-3" placeholder="Search"  onChange={handleKeyDown}/>
      <Table
        className="mt-3"
        rowKey={"userId"}
        columns={columns}
        dataSource={userSearch}
      />
    </div>
  );
}
