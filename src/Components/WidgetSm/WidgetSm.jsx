import React from "react";
import "./WidgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

export default function WidgetSm() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log("Mount");
        fetch('https://dashboard-admin-react-91011-default-rtdb.firebaseio.com/users.json')
            .then(response => response.json())
            .then(data => {
                setUsers(Object.values(data))
            })
    }, []);


    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li key={user.id} className="widgetSmListItem">
                        <img src='./images/profile.jfif' className="widgetSmImg" />
                        <div className="widgetSmUser">
                            <span className="widgetSmUserName">{user.fullName}</span>
                            <span className="widgetSmUserTitle">{user.phone}</span>
                        </div>
                        <button className="widgetSmButton">
                            <VisibilityIcon className="widgetSmIcon" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
