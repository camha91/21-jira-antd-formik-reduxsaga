import React from "react";
import avatar1 from "../../../assets/img/avatar1.jfif";
import avatar2 from "../../../assets/img/avatar2.jfif";
import avatar3 from "../../../assets/img/avatar3.jfif";

export default function InfoMain() {
    return (
        <>
            <h3>Cyber Board</h3>
            <div className="info" style={{ display: "flex" }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: "flex" }}>
                    <div className="avatar">
                        <img src={avatar1} alt="avatar1" />
                    </div>
                    <div className="avatar">
                        <img src={avatar2} alt="avatar2" />
                    </div>
                    <div className="avatar">
                        <img src={avatar3} alt="avatar3" />
                    </div>
                </div>
                <div style={{ marginLeft: 20 }} className="text">
                    Only My Issues
                </div>
                <div style={{ marginLeft: 20 }} className="text">
                    Recently Updated
                </div>
            </div>
        </>
    );
}
