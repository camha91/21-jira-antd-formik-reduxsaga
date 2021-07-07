import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CLOSE_DRAWER,
    OPEN_DRAWER,
} from "../../redux/constants/DrawerCyberBugsConst";

export default function DrawerCyberBugs(props) {
    const { visible, ComponentContentDrawer, callBackSubmit, title } =
        useSelector((state) => state.DrawerReducer);

    const dispatch = useDispatch();

    const showDrawer = () => {
        dispatch({ type: OPEN_DRAWER });
    };

    const onClose = () => {
        dispatch({ type: CLOSE_DRAWER });
    };
    return (
        <>
            {/* <button onClick={showDrawer}>Show Drawer</button> */}
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <Button onClick={onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    );
}
